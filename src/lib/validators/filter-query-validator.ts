import { z } from 'zod'

export const FilterQueryValidator = z.object({
  beds: z.number().optional(),
  price: z.number().optional(),
  state: z.string().optional(),
})

export type TFilterQueryValidator = z.infer<typeof FilterQueryValidator>
