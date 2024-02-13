import {
    AfterChangeHook,
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
import { Access,CollectionConfig } from "payload/types";
import { Property } from '@/payload-types';
import {  User } from '../../payload-types'


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

export const Properties: CollectionConfig = {
    slug: 'property',
    admin: {
        useAsTitle: 'Company_name'
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
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
        name: 'Company_name',
        label: 'Company name',
        type: 'text',
        required: true  
    },
    {
        name: 'Manager_full_name',
        label: 'Manager Full name',
        type: 'text',
        required: true  
    },
    {
        name: 'Comapany_Contact_number',
        label: 'Comapany Conatact number',
        type: 'text',
        required: true  
    },
    {
        name: 'name',
        label: 'name',
        type: 'text',
        required: true
    },
    {
        name: 'unit_building',
        label: 'Unit Building',
        type: 'text',
        required: true
    },
    {
        name: 'unit_category',
        label: 'Unit Category',
        type: 'text',
        required: true
    },
    {
        name: 'Unit_name',
        label: 'Unit Name',
        type: 'text',
        required: true
    },
    {
        name: 'description',
        label: 'product details',
        type: 'textarea'
    },
    {
        name: 'Payment_type',
        label: 'payment type',
        type: 'select',
        required: true,
        options: [
            {
                label: 'Rent',
                value: 'Rent',
            },
            {
                label: 'Buy',
                value: 'Buy',
            },
        ]
    },
    {
        name: 'price',
        label: 'Price in Naira',
        min: 0,
        max: 1000000,
        type: 'number',
        required: true
    },
    {
        name: 'Property_type',
        label: 'property type',
        type: 'select',
        required: true,
        options: [
            {
                label: 'Housings',
                value: 'Housings',
            },
            {
                label: 'Real_Estate',
                value: 'Real Estate',
            },
        ]
    },
    
    {
        name: 'state',
        label: 'state',
        type: 'text',
        required: true
    },
    {
        name: 'Bedrooms',
        label: 'bedrooms',
        type: 'number',
        required: true
    },
    {
        name: 'Days',
        label: 'days',
        type: 'text',
        required: true  
    },
    {
        name: 'property_files',
        label: 'Property file(s)',
        type: 'relationship',
        required: true,
        relationTo: 'property_files',
        hasMany: false,
      },
    {
        name: 'approvedForSale',
        label: 'Product files',
        type: 'select',
        defaultValue: 'pending',
        access: {
            create: ({req}) => req.user.role === 'admin',
            read: ({req}) => req.user.role === 'admin',
            update: ({req}) => req.user.role === 'admin',
        },
        options: [
            {
                label: 'pending verification',
                value: 'pending',
            },
            {
                label: 'Approved',
                value: 'approved',
            },
            {
                label: 'Denied',
                value: 'denied',
            },
        ]
    },
    {
        name: 'images',
        type: 'array',
        label: 'Product images',
        minRows: 1,
        maxRows: 4,
        required: true,
        labels: {
            singular: 'Image',
            plural: 'images'
        },
        fields: [
            {
                name: 'images',
                type: 'upload',
                relationTo: 'media',
                required: true
            }
        ]
    }
]
}