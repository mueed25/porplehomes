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
      <div className='pt-4 pb-4 '>
        <p className='text-muted-foreground'>Hi There,</p>
        <h2 className='font-semibold'>Announcement</h2>
      </div>

     {!pathname.includes('/account/Communication/Compose')?  <div className=" mt-6 lg:px-8 max-lg:px-4 flex justify-between">

     <div className="flex space-x-4">
        <button
          className={`px-4 py-2 ${
            pathname.includes('/account/Communication') ? 'bg-porple text-white' : 'bg-gray-300'
          }`}
          onClick={handleSentClick}
        >
          Sent
        </button>
        <button
          className={`px-4 py-2  ${
            pathname.includes('/account/Communication/Inbox') ? 'bg-porple text-white' : 'bg-gray-300'
          }`}
          onClick={handleInboxClick}
        >
          Inbox
        </button>
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