import { AdminList, SettingList } from '@/components/List'
import MobileNav from './MobileNav'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { getServerSideUser } from '@/lib/payload.utils'
import { LayoutDashboard } from 'lucide-react'



const AccNavbar = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user?.id,
      },
    },
  })

  const [order] = orders

  return (
    <div className='relative w-[224px] '>
        <div className='flex flex-col justify-between border fixed h-screen py-8 px-4 shadow-sm border-purple-900 bg-porple max-lg:hidden'>
      <div>
      { !user ? (
          <div>
              {/* <div className="flex py-3 text-white">
                  <span className='py-1'><LayoutDashboard /></span>
                  <Link 
                  className='flex justify-center items-center pl-2'
                  href={`/account/Overview`}>Overview</Link>
                </div> */}
          </div>
      ) : (<div>
            { 
        AdminList.map((item, index) => (
                <div  key={index} className="flex py-3 text-white">
                  <span className='py-1'>{item?.icon}</span>
                  <Link 
                  className='flex justify-center items-center pl-2'
                  href={`/account/${item?.name}`}>{item?.name}</Link>
                </div>
              ))}
          </div>)}
        </div>

        <div >
        {SettingList.map((item, index) => (
        <div key={index} className="flex py-3 text-white">
          <span className='py-1'>{item?.icon}</span>
          <div className='flex justify-center items-center pl-2'>{item?.name}</div>
        </div>
      ))}
        </div>
    </div>

    <MobileNav />
    </div>
  )
}

export default AccNavbar