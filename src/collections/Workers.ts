import { getPayloadClient } from "@/getPayloadClient";
import { User, Order, Property } from "@/payload-types";
import payload from "payload";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
import { boolean } from "zod";


const addUser : BeforeChangeHook = ({req, data}) => {
    const user = req.user as User | null
    return {...data, user: user?.id}
}

const yourOwnAndPurchased : Access = async ({req}) => {
    const user = req.user as User | null

    if(user?.role === 'admin' ) return true
    if (!user) return false

    const {docs: property} = await req.payload.find({
        collection: 'property',
        depth: 0,
        where: {
            user: {
                equals: user.id,
            }
        }
    })

    const ownProductFiles = property.map((prod) => prod.property_files).flat()

    const {docs: Orders} = await req.payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            user: {
                equals: user.id
            }
        }
    }) 



    return {
        id: {
            in: [
                ...ownProductFiles,
                // ...purChasedProductFiles
            ]
        }
    }
}

export const Workers: CollectionConfig= {
    slug: 'workers',
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnAndPurchased,
        update: ({req}) => req.user.role === 'admin',
        delete: ({req}) => req.user.role === 'admin',
    },
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
        defaultColumns: ['id'],
      },
    fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            condition: () => false,
          },
          hasMany: false,
          required: true,
        },
        {
            name: 'Full_name',
            label: 'Full name',
            type: 'text',
            required: true,

        },
        {
            name: 'Phone_number',
            label: 'Phone number',
            type: 'text',
            required: true,
        },
        {
            name: 'Working_field',
            label: 'Working field',
            type: 'text',
            required: true,
        },
      ],

}