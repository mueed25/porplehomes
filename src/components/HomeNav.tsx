import Link from 'next/link'
import UserAccountNav from './UserAccountNav'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import MobilNav from './MobilNav'
import Image from 'next/image'
import { Menu, Search, User } from 'lucide-react'
import AllButtons from './AllButtons'
import IconsView from './IconsView'
import Drawers from './Drawers'
import {Separator} from '@/components/ui/separator'
import { Input } from './ui/input'

const HomeNav = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className=' z-50 top-0 inset-x-0 h-16  pb-4 fixed '>
      <header className='absolute w-full sm:pb-2 pt-2 max-sm:border-b  bg-white max-sm:shadow-md'>
        <MaxWidthWrapper className=' sm:pb-2 '>
          <div className=''>
            <div className='flex h-16 items-center'>
              <MobilNav />
              <div className='ml-2 flex lg:ml-0'>
                <Link 
                className='h-10 w-10'
                href='/'>
                  <Image
                   src='/hippo-email-sent.png'
                   width={50}
                   height={50}
                  alt='the email was sent'
                  />
                </Link>
              </div>

            <div className='flex items-center justify-center w-full    max-md:w-full max-md:justify-end pr-2 max-sm:hidden '>
              <div className='flex rounded-full shadow-md mx-4 px-2 py-1'>
                <div className=' flex items-center px-2'>
                <Input
                className='border-0'
                placeholder='AnyWeek' />
                </div>
                <div className=' flex items-center px-2'>
                  <Input
                  className='border-0'
                  placeholder='AnyWeek' />
                    </div>
                    <div className=' flex items-center px-2'>
                    <Input
                    className='border-0'
                      placeholder='AnyWeek' />                    
                  </div>

                    <button className='px-2 py-2 shadow-md bg-purple-800 rounded-full '>
                      <Search className='text-white'/>
                    </button>
              </div>
              </div>

              <div className='max-sm:flex hidden w-full pr-2 justify-end'>
                <Drawers />
              </div>


              <div className='flex items-center justify-end max-sm:ml-2'>
              <div className='bg-white shadow-md rounded-full flex border px-1 py-1 '>
                {user?  <UserAccountNav user={user.email}/>:  <UserAccountNav user='y'/>}
                     
                      <div className='flex justify-center items-center px-2'>
                      <User />
                      </div>
                    </div>
              </div>


              {/* <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div> */}

              {/* <div className='ml-auto flex items-center'>
                <div className=' flex lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {user ? null : (
                    <Link
                      href='/sign-in'
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'border text-purple-800 hover:text-purple-600 shadow-md mr-2 rounded-lg'
                      })}>
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      className='h-6 w-px bg-white max-lg:hidden'
                      aria-hidden='true'
                    />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'max-md:hidden text-purple-800 hover:text-purple-600 shadow-md rounded-lg'
                      })}>
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span
                      className='h-6 w-px max-lg:hidden bg-white'
                      aria-hidden='true'
                    />
                  ) : null}

                  {user ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        className='max-lg:hidden h-6 w-px bg-porple'
                        aria-hidden='true'
                      />
                    </div>
                  )}

                  {/* <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div> */}


              </div>
              
          </div>
        </MaxWidthWrapper>
        <div className='sm:flex hidden'>
        <Separator />
        </div>
        <div className='w-full flex'>
          {/* <div className='py-4'>
            
          </div> */}
          <MaxWidthWrapper className=''>
                <IconsView />
          </MaxWidthWrapper>
              </div>
      </header>
      {/* <Separator /> */}

      

      {/* <div className=' flex items-center border'>
                <div className=' flex lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                    
                </div>
        </div> */}
    </div>
  )
}

export default HomeNav
