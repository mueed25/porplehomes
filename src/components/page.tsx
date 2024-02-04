import React from 'react'
import { Separator } from '@/components/ui/separator'

const page = () => {
  return (
    <div className='flex flex-col w-full lg:px-8 max-lg:px-4'>
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
    </div>
    </div>
  ) 
}

export default page