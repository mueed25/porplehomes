'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Compose = () => {

    const router = useRouter()

    const handleClick = () => {
        router.push('/account/Communication/Compose')
    }

  return (
    <div className='flex pt-4 justify-end w-full'>
        <Button onClick={handleClick}>Compose</Button>
    </div>
  )
}

export default Compose