import React from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Tenants, columns } from "@/components/payment3/columns"
import { DataTable } from "@/components/payment3/data-table"
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { Tenant, User, Property } from '@/payload-types'

async function getData(): Promise<Tenants[]> {
  const payload = await getPayloadClient()
  // Fetch data from your API here.
  const { docs: allproduct } = await payload.find({
    collection: 'Tenant',
    depth: 2,
  })

  const filtered = allproduct.map(items => {
    return 
      [{
        UnitName: (items.products as Property[]).map(item => item.Unit_name),
        UnitBuilding: (items.products as Property[]).map(item => item.unit_building),
        UnitCategory: (items.products as Property[]).map(item => item.unit_category),
        TenantName: items.Full_name,
        Status: 'Occupied'
      }]
  } )
  console.log(filtered)
  
  return allproduct
}

const page = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  console.log()


  const data = await getData()
  return (
    <div className='flex flex-col w-full lg:px-8 max-lg:px-4'>
       <section className='flex justify-between w-full pb-6 pt-2'>
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
    <div className=' grid max-md:grid-cols-1 grid-cols-1 gap-6 py-6 '>

    <div className='shadow-md rounded-xl py-2'>
                <h2 className='px-4 py-2'>Profit and Available Balance</h2>
                <Separator />
                <div className='px-4 py-4'>
                  
                  <div className='flex h-full pt-10 px-4 items-center'>
                    <div className='h-40 w-40 rounded-full border-4 border-[#7623BA] flex flex-col justify-center items-center py-4'>
                        <h3>Balance</h3>
                        <p>balance</p>
                    </div>
                  </div>
                </div>
            </div>
    </div>
    <div className='py-3 pb-4'>
    <DataTable columns={columns} data={data} />
    </div>
    </div>
  ) 
}

export default page