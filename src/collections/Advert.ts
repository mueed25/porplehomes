import {
    AfterChangeHook,
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
import { Access,CollectionConfig } from "payload/types";
import { Property } from '@/payload-types';
import {  User } from '../payload-types'


const addUser: BeforeChangeHook<Property> = async ({
    req,
    data,
  }) => {
    const user = req.user
  
    return { ...data, user: user.id }
  }


  const syncUser: AfterChangeHook<Property> = async ({
    req,
    doc,
  }) => {
    const fullUser = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
    })
  
    if (fullUser && typeof fullUser === 'object') {
      const { products } = fullUser
  
      const allIDs = [
        ...(products?.map((product) =>
          typeof product === 'object' ? product.id : product
        ) || []),
      ]
  
      const createdProductIDs = allIDs.filter(
        (id, index) => allIDs.indexOf(id) === index
      )
  
      const dataToUpdate = [...createdProductIDs, doc.id]
  
      await req.payload.update({
        collection: 'users',
        id: fullUser.id,
        data: {
          products: dataToUpdate,
        },
      })
    }
  }
  
  const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined

    if (!user) return false
    if (user.role === 'admin') return true

    const userProductIDs = (user.products || []).reduce<
      Array<string>
    >((acc, product) => {
      if (!product) return acc
      if (typeof product === 'string') {
        acc.push(product)
      } else {
        acc.push(product.id)
      }

      return acc
    }, [])

    return {
      id: {
        in: userProductIDs,
      },
    }
  }

export const Advert: CollectionConfig = {
    slug: 'advert',
    admin: {
        useAsTitle: 'Description'
    },
    access: {
        read: isAdminOrHasAccess(),
        update: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
        create: ({ req }) => req.user.role === 'admin',
      },
    hooks: {
        afterChange: [syncUser],
        beforeChange: [addUser],
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
        name: 'Description',
        label: 'Description',
        type: 'text',
        required: true  
    },
    
    {
        name: 'images',
        type: 'array',
        label: 'advert images',
        minRows: 1,
        maxRows: 1,
        required: true,
        labels: {
            singular: 'Image',
            plural: 'images'
        },
        fields: [
            {
                name: 'images',
                type: 'upload',
                relationTo: 'advertisement',
                required: true
            }
        ]
    }
]
}