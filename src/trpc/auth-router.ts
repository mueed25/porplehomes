import { AuthCredentialValidator } from "../lib/validators/account-credential-valiadator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../getPayloadClient";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
    createPayloadUser : publicProcedure
    .input(AuthCredentialValidator)
    .mutation(async ({input}) => {
        const {email , password} = input
        const payload = await getPayloadClient()

        const {docs: users} = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: email
                }
            }
        })

        if (users.length !== 0) 
            throw new TRPCError({code: 'CONFLICT'})

        
        await payload.create({
            collection: 'users',
            data: {
                email,
                password,
                role: 'user'
            }
        })

        return {success: true, sentToEmail: email}
    }),

    verifyEmail: publicProcedure
    .input(z.object({token: z.string()}))
    .query(async ({ input }) => {
        const {token} = input

        const payload = await getPayloadClient()

        const isVerified = await payload.verifyEmail({
            collection: 'users',
            token
        })

        if(!isVerified)
            throw new TRPCError({code: 'UNAUTHORIZED'})


        return {success: true}
    }),

    signIn: publicProcedure
    .input(AuthCredentialValidator)
    .mutation(async ({ input , ctx }) => {
        const { email, password } = input
        const {res} = ctx

        const payload = await getPayloadClient()

        try {
            await payload.login({
                collection: 'users',
                data: {
                    email,
                    password
                },
                res
            })
            return {sucess: true}
        } catch (error) {
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }
    })
})