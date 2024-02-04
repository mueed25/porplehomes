import { z } from 'zod'

export const FilterQueryValidator = z.object({
  property: z.string().optional(),
  beds: z.string().optional(),
  price: z.string().optional(),
  state: z.string().optional(),
})

export type TFilterQueryValidator = z.infer<typeof FilterQueryValidator>
