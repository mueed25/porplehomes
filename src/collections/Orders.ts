import { Access, CollectionConfig } from 'payload/types'

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    user: {
      equals: user?.id,
    },
  }
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
    description:
      'A summary of all your orders on DigitalHippo.',
  },
  access: {
    read: yourOwn,
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
    create: ({ req }) => req.user.role === 'admin',
  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      access: {
        read: ({ req }) => req.user.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      admin: {
        hidden: true,
      },
      relationTo: 'users',
      required: true,
    },
    {
        name: 'Status',
        type: 'select',
        required: true,
        access: {
            create: ({req}) => req.user.role === 'admin',
            read: ({req}) => req.user.role === 'admin',
            update: ({req}) => req.user.role === 'admin',
          },
        options: [
            {
                label: 'Paid',
                value: 'Paid',
            },
            {
                label: 'Processing',
                value: 'Processing',
            },
            {
              label: 'Failed',
              value: 'Failed',
          },
          {
              label: 'Renewed',
              value: 'Renewed',
          },
        ]
      },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'property',
      required: true,
      hasMany: true,
    },
  ],
}
