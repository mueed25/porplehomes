'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'



const AddButton = () => {

    const router = useRouter()

    const handleClick = () => {
        router.push('/account/People/Subscription')
    }

  return (
    <div>
        <Button className='' onClick={handleClick}>Create New</Button>
    </div>
  )
}

export default AddButton