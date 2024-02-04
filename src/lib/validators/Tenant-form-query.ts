import { z } from 'zod'

export const TenantQueryValidator = z.object({
    Full_name: z.string(), 
    Phone_number: z.string(),
    productId: z.string(),
    Adress: z.string(),
    City: z.string(),
    State: z.string()
})

export type TTenantQueryValidator = z.infer<typeof TenantQueryValidator>
