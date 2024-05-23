'use client'
import React from 'react'
import { useState } from 'react';
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'



const Announce = () => {
    const [activeTab, setActiveTab] = useState('inbox');
    const router = useRouter()
    const pathname = usePathname()

    pathname.includes

    const handleClick = () => {
        router.push('/account/Communication/Compose')
    }

    const handleSentClick = () => {
      router.push('/account/Communication')
    }
    const handleInboxClick = () => {
      router.push('/account/Communication/Inbox')
    }

  return (
    <div className='w-full '>
      <div className='pb-2'>
        <p className='text-muted-foreground'>Hi There,</p>
        <p className=''>Announcement</p>
      </div>

     {!pathname.includes('/account/Communication/Compose')?  <div className=" mt-2 pr-2 flex justify-between">

     <div className="flex space-x-2 ">
        <Button
          className={` ${
            pathname.includes('/account/Communication') ? 'bg-porple text-white' : 'bg-gray-300'
          }`}
          onClick={handleSentClick}
        >
          Sent
        </Button>
        <Button
          className={`  ${
            pathname.includes('/account/Communication/Inbox') ? 'bg-porple text-white' : 'bg-gray-300'
          }`}
          onClick={handleInboxClick}
        >
          Inbox
        </Button>
      </div>
      <div className=' '>
      <Button onClick={handleClick}>Compose</Button>
  </div>
  </div>: null
      }
      
    </div>
  )
}

export default Announce