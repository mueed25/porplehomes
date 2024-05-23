import Announce from '@/components/Announce'
import React from 'react'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { Tenants, columns } from "@/components/payment5/columns"
import { DataTable } from "@/components/payment5/data-table"
import { Tenant, User, Property } from '@/payload-types'
import { MessageCircleIcon } from 'lucide-react'

async function getData(): Promise<Tenants[]> {
  const payload = await getPayloadClient()
  // Fetch data from your API here.
  const { docs: allproduct } = await payload.find({
    collection: 'TenantM',
    depth: 2,
  })

  const filtered = allproduct.map(items => ({
        id: items.id,
        Image: <MessageCircleIcon />,
        Subject: items.Message,
        DeliveryMethod: 'inbox',
        MessageFor: items.Email,
      }) )
  
  return filtered
}

const page = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  console.log()
  const data = await getData()

 

  return (
    
    <div className='w-full pt-4 lg:px-8 max-lg:px-4'>
      {!user? 'No Data available' : null}
      {user?.role === 'admin' ? <DataTable columns={columns} data={data} /> : null}
    </div>
  )
}

export default page