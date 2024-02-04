import { z } from 'zod'
import { privateProcedure,publicProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../getPayloadClient'
import { usePaystackPayment } from 'react-paystack'
// import { useRouter } from 'next/navigation'

export const paymentRouter = router({
    createSession: privateProcedure
    .input(z.object({ productid : z.string() }))
    .mutation(async ({ctx, input}) => {
        const {user} = ctx

        const {productid} = input

        if (productid.length === 0 ) {
                throw new TRPCError({code: 'BAD_REQUEST'})
        }

        const payload = await getPayloadClient()

        const {docs : product } = await payload.find({
            collection: 'property',
            where: {
                id: {
                    in: productid
                }
            }
        })

        const filteredProduct = product.filter( prod => Boolean(prod.price))

        const order = await payload.create({
          collection: 'orders',
          data: {
            _isPaid: false,
            Status: "Processing",
            products : filteredProduct.map(prod => prod.id),
            user: user.id,
          },
        })

            return {sucess: true , data: user.email , id: order.id}

    }),
    pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input

      const payload = await getPayloadClient()

      const { docs: orders } = await payload.find({
        collection: 'orders',
        where: {
          id: {
            equals: orderId,
          },
        },
      })

      if (!orders.length) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [order] = orders

      return { isPaid: order._isPaid }
    }),
    createTenant: privateProcedure
    .input(z.object({
        Full_name: z.string(), 
        Phone_number: z.string(),
        productId: z.string(),
        Adress: z.string(),
        Gender: z.string(),
        City: z.string(),
        State: z.string()
    }))
    .mutation(async ({ctx, input}) => {
        const {user} = ctx

        const {productId, Full_name, Phone_number,Gender, Adress, City, State} = input

        if (productId.length === 0 ) {
                throw new TRPCError({code: 'BAD_REQUEST'})
        }

        const payload = await getPayloadClient()

        const {docs : product } = await payload.find({
            collection: 'property',
            where: {
                id: {
                    in: productId
                }
            }
        })

        const filteredProduct = product.filter( prod => Boolean(prod.id))

        await payload.create({
            collection: 'Tenant',
            data: {
                Gender: Gender,
                Full_name: Full_name,
                Phone_number: Phone_number,
                products : filteredProduct.map(prod => prod.id),
                user: user.id,
                Adress: Adress,
                City: City,
                State: State,
            },
          })
    
          return {sucess: true}
    }),
    createAnnouncement: publicProcedure
    .input(z.object({
      Email: z.string(),
      Subject: z.string(),
      Message: z.string()
    }))
    .mutation( async ({input}) => {

      const {Email, Subject, Message} = input

      const payload = await getPayloadClient()

      await payload.create({
          collection: 'Announce',
          data: {
            Email: Email,
            Subject: Subject,
            Message: Message,
          },
        })
  
        return {sucess: true}
    }),
    createMessage: publicProcedure
    .input(z.object({
      Email: z.string(),
      Message: z.string(),
      Subject: z.string()
    }))
    .mutation( async ({input}) => {

      const {Email, Message, Subject} = input


      const payload = await getPayloadClient()

        
    

      await payload.create({
          collection: 'TenantM',
          data: {
            Email: Email,
            Subject: Subject,
            Message: Message,
            Date: String(Date.now()),
          },
        })
  
        return {sucess: true}
    }),
    createTenant1: publicProcedure
    .input(z.object({
        Full_name: z.string(), 
        Phone_number: z.string(),
        Adress: z.string(),
        Email: z.string(),
        City: z.string(),
        State: z.string(),
        Unit_name: z.string(),
        Unit_building: z.string(),
        Unit_category: z.string()
    }))
    .mutation(async ({ctx, input}) => {

        const {Email, Full_name, Phone_number,Unit_name, Unit_building, Unit_category,  Adress, City, State} = input

        const payload = await getPayloadClient()

        await payload.create({
            collection: 'Tenant1',
            data: {
              Email: Email,
              Full_name: Full_name, 
              Phone_number: Phone_number,
              Unit_name: Unit_name, 
              Unit_building: Unit_building, 
              Unit_category: Unit_category,  
              Adress: Adress, 
              City: City, 
              State: State,
            },
          })
    
          return {sucess: true}
    })
})