import { Access, CollectionConfig } from 'payload/types'
import { User } from "payload/dist/auth"


const isAdminOrHasAccessToImages =
  (): Access =>
  async ({ req }) => {
    const user = req.user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    return {
      user: {
        equals: req.user.id,
      },
    }
  }

export const Subscription: CollectionConfig = {
  slug: 'subscription',
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  access: {
    read: isAdminOrHasAccessToImages(),
    delete: isAdminOrHasAccessToImages(),
    update: isAdminOrHasAccessToImages(),
  },
  fields: [
    {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
        required: true,
        hasMany: false,
        admin: {
            condition: () => false,
        },
    },
    {
      name: 'membership',
      label: 'membership',
      type: 'select',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Premium', value: 'premium' },
      ],
      required: true,

    },
    ],
}