import Announce from '@/components/Announce'
import React from 'react'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { Tenants, columns } from "@/components/payment4/columns"
import { DataTable } from "@/components/payment4/data-table"
import { Tenant, User, Property } from '@/payload-types'
import { MessageCircleIcon } from 'lucide-react'

async function getData(): Promise<Tenants[]> {
  const payload = await getPayloadClient()
  // Fetch data from your API here.
  const { docs: allproduct } = await payload.find({
    collection: 'Announce',
    depth: 2,
  })

  const filtered = allproduct.map(items => ({
        id: items.id,
        Image: <MessageCircleIcon className='text-purple-600'/>,
        Subject: items.Subject,
        DeliveryMethod: 'Inbox',
        MessageFor: items.Email,
        Status: 'Delivered'
      }) )
  
  return filtered
}

const page = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  console.log()
  const data = await getData()

 

  return (
    
    <div className='w-full pt-4 px-2 '>
            {!user? 'No Data available' : null}
            {user?.role === 'admin' ? <DataTable columns={columns} data={data} /> : null}
    </div>
  )
}

export default page