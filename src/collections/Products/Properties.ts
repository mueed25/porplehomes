import {
    BeforeChangeHook,
  } from 'payload/dist/collections/config/types'
import { CollectionConfig } from "payload/types";
import { Property } from '@/payload-types';


const addUser: BeforeChangeHook<Property> = async ({
    req,
    data,
  }) => {
    const user = req.user
  
    return { ...data, user: user.id }
  }

export const Properties: CollectionConfig = {
    slug: 'property',
    admin: {
        useAsTitle: 'Company_name'
    },
    access: {},
    hooks: {
        beforeChange: [addUser]
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
        name: 'description',
        label: 'product details',
        type: 'textarea'
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
        name: 'priceId',
        access: {
            create: () => false,
            read: () => false,
            update: () => false,
        },
        type: 'text',
        admin: {
            hidden: true
        }
    },
    {
        name: 'paystackId',
        access: {
            create: () => false,
            read: () => false,
            update: () => false,
        },
        type: 'text',
        admin: {
            hidden: true
        }
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