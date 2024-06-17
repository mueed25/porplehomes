'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminList, AdminList1 } from './List'
import { Admin } from 'mongodb'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen)
      document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white'>
        <Menu className='h-6 w-6 ' aria-hidden='true' color='black'/>
      </button>
    )

  return (
    <div className=''>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25 ' />
      </div>

      <div className='fixed  inset-0 z-40 flex border-4'>
        <div className='w-4/5 '>
          <div className='relative flex w-full max-w-sm flex-col h-screen  bg-white pb-12 shadow-xl justify-between'>
            <div className='flex flex-col px-4 pb-2 pt-5'>
              <div>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
              </div>
              <div className='my-2 '>
              <div className='px-4 flex py-2'>
                  <Link 
                  href={`/account`}>Account</Link>
                </div>
                <div className='px-4 flex py-2'>
                  <Link 
                  href={`/account/Overview`}>Overview</Link>
                </div>
                <div className='px-4 flex py-2'>
                  <Link 
                  href={`/account/Residentials`}>Residentials</Link>
                </div>
                <div className='px-4 flex py-2'>
                  <Link 
                  href={`/account/People`}>People</Link>
                </div>
                <div className='px-4 flex py-2'>
                  <Link 
                  href={`/account/Communication`}>Communication</Link>
                </div>
            </div>
            </div>

            

            {/* <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
              <div className='flow-root'>
                <Link
                  onClick={() => closeOnCurrent('/sign-in')}
                  href='/sign-in'
                  className='-m-2 block p-2 font-medium text-gray-900'>
                  Sign in
                </Link>
              </div>
              <div className='flow-root'>
                <Link
                  onClick={() => closeOnCurrent('/sign-up')}
                  href='/sign-up'
                  className='-m-2 block p-2 font-medium text-gray-900'>
                  Sign up
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
