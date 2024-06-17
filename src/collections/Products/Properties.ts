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

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory (FCT)"
  ];
  

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
      name: 'agentimage',
      type: 'array',
      label: 'Agent images',
      minRows: 1,
      maxRows: 2,
      required: true,
      labels: {
          singular: 'Image',
          plural: 'images'
      },
      fields: [
          {
              name: 'agentimages',
              type: 'upload',
              relationTo: 'agentmedia',
              required: true
          }
      ]
    },
    {
        name: 'Agent_full_name',
        label: 'Agent Full name',
        type: 'text',
        required: true  
    },
    {
        name: 'AgentContact_number',
        label: 'Agent Conatact number',
        type: 'text',
        required: true  
    },
    {
      name: 'Agent_Gmail',
      label: 'Agent Gmail',
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
      name: 'State',
      label: 'State',
      type: 'select',
      required: true,
      options: states.map(state => ({ label: state, value: state }))
  },
    {
        name: 'Bedrooms',
        label: 'bedrooms',
        type: 'number',
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
        relationTo: 'property_files',
        hasMany: false,
      },
    {
        name: 'approvedForSale',
        label: 'Product files',
        type: 'select',
        defaultValue: 'approved',
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