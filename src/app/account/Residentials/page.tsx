import React from 'react'
import {MessageCircleIcon, Search} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { Tenants, columns } from "@/components/payment1/columns"
import { DataTable } from "@/components/payment1/data-table"
import { Tenant, User, Property } from '@/payload-types'

async function getData(): Promise<Tenants[]> {
  const payload = await getPayloadClient()
  // Fetch data from your API here.
  const { docs: allproduct } = await payload.find({
    collection: 'Tenant',
    depth: 2,
  })

  const filtered = allproduct.map(items => ({
    id: items.id,
    UnitName: ((items.products as Property[]).map(item => { return item.Unit_name})).toString(),
    UnitBuilding: ((items.products as Property[]).map(item => item.unit_building)).toString(),
    UnitCategory: ((items.products as Property[]).map(item => item.unit_category)).toString(),
    TenantName: items.Full_name,
    Status: 'Occupied'
  }) )

  
  return filtered
}

async function getUserData(): Promise<Tenants[]> {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()
  // Fetch data from your API here.
  const { docs: allorder } = await payload.find({
    collection: 'users',
    depth: 2,
    where: {
      id: {
        equals: user?.id,
      },
    },
  })

  const filteredroperty = allorder.map(items => (
    items.products? (items.products as Property[]).map(item => item.id) : [] )
  ).flat()
  
  console.log(filteredroperty)
  const { docs: allproduct } = await payload.find({
    collection: 'Tenant',
    depth: 2,
    where: {
      products : {
        in: filteredroperty
      }
    }
  })

  const filtered = allproduct.map(items => ({
    id: items.id,
    UnitName: ((items.products as Property[]).map(item => { return item.Unit_name})).toString(),
    UnitBuilding: ((items.products as Property[]).map(item => item.unit_building)).toString(),
    UnitCategory: ((items.products as Property[]).map(item => item.unit_category)).toString(),
    TenantName: items.Full_name,
    Status: 'Occupied'
  }) )

  
  return filtered
}


const page = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
 
  // const ownProductFileIds = products
  // .map((prod) => prod.product_files)

// const { docs: allproduct } = await payload.find({
//   collection: 'Tenant',
//   depth: 2,
// })


// const purchasedProductFileIds = orders
//   .map((order) => {
//     return order.products.map((product) => {
//       if (typeof product === 'string')
//         return payload.logger.error(
//           'Search depth not sufficient to find purchased file IDs'
//         )

//       return typeof product.property_files === 'string'
//         ? product.property_files
//         : product.property_files.id
//     )
//   })
//   // .filter(Boolean)
//   // .flat()

const data = await getData()
const data1 =  await getUserData()



  return (
    <div className='pt-2 w-full lg:px-4 max-lg:px-2'>
      <section className='flex justify-between w-full pb-6 '>
          <div>
            <p className='flex text-muted-foreground text-sm'>Hello {user?.email}</p>
            <h3 className='font-bold text-md'>Wellcome Back!</h3>
          </div>
          <div className='flex '>
            {/* <div className='flex justify-center items-center border px-2 rounded-md shadow-md'>
              <Search />
              <Input type='text' className='border-0'/>
            </div> */}
            <div className='flex justify-center items-center pl-2 '>
              <Image 
              src='/hippo-email-sent.png'
              alt='profile image'
              width={50}
              height={50}
              />
            </div>
          </div>
        </section>
        
        {!user? '' : null}
        {user?.role !== 'admin' ? (
          <div className='pb-8'>
          <DataTable columns={columns} data={data1} />
          </div>
        ) : null}
        {user?.role === 'admin' ? (
          <div className='pb-8'>
          <DataTable columns={columns} data={data} />
          </div>
          ) : null}
        
    </div>
  )
}

export default page