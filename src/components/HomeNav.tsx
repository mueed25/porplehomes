import Link from 'next/link'
import UserAccountNav from './UserAccountMenu'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import MobilNav from './MobilNav'
import Image from 'next/image'

const HomeNav = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <div className=' z-50 top-0 inset-x-0 h-16'>
      <header className='absolute w-full'>
        <MaxWidthWrapper>
          <div className=''>
            <div className='flex h-16 items-center'>
              <MobilNav />
              <div className='ml-4 flex lg:ml-0'>
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

              {/* <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div> */}

              <div className='ml-auto flex items-center'>
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
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default HomeNav
