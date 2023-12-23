import { z } from 'zod'

export const QueryValidator = z.object({
  category: z.string().optional(),
  Bedrooms: z.number().optional(),
  price: z.number().optional(),
  state: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>
