import React from 'react'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { getServerSideUser } from '@/lib/payload.utils'
import Accordian from '@/components/Accordian'
import { Property } from '@/payload-types';




const page = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()

  const { docs: properties } = await payload.find({
    collection: 'property',
    depth: 2,
    where: {
      user: {
        equals: user?.id,
      },
    },
  })

  const properties1 = properties as Property[]

  return (
    <div className='lg:px-6 px-4 pt-2'>
      <h1 className='lg:pt-4 text-xl py-2 font-bold'>Property Qrcodes</h1>
      <h2 className=' text-muted-foreground text-md'>Redirrect Your Tenant to a safer and more secure payment and management system in porplehomes app</h2>
      <div className='py-4'>
      <Accordian properties={properties1}/>
      </div>
    </div>
  )
}

export default page