'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Buttons = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/account/People/NewTenant')
    }

    return (
        <div className='w-full flex justify-end pt-4 b-4'>
            <Button className='max-md:w-full' onClick={handleClick}>Create New</Button>
        </div>
    )
}

export default Buttons
