import {MessageCircleIcon, Search} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { DataTableDemo } from '@/components/DataTable'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { Property } from '@/payload-types'
import { cn, formatPrice } from '@/lib/utils'
import { redirect } from 'next/navigation'



const page = async () => {

  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  const payload = await getPayloadClient()
  const { docs: allorder } = await payload.find({
    collection: 'property',
    depth: 2,
    where: {
      user: {
        equals: user?.id,
      },
    },
  })

  if (!user) {
    return redirect(
      `/sign-in?origin=account/Overview`
    )
  }

  const filteredroperty = allorder.map(items => items.id)

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user?.id,
      },
    },
  })

  const { docs: prods } = await payload.find({
    collection: 'users',
    depth: 2,
    where: {
      id: {
        equals: user?.id,
      },
    },
  })

  const filteredprods = prods.map( prod => (prod.products as Property[])?.map( pro => pro.id)).flat()
console.log(filteredprods)


  const { docs: allorders } = await payload.find({
    collection: 'orders',
    depth: 2,
  })

  const { docs: allmessages } = await payload.find({
    collection: 'TenantM',
    depth: 2,
  })

  const { docs: allUserOrders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      products : {
        in: filteredprods
      }
    }
  })



  const { docs: allproduct } = await payload.find({
    collection: 'Tenant',
    depth: 2,
  })

  const { docs: allUserproduct } = await payload.find({
    collection: 'Tenant',
    depth: 2,
    where: {
      products : {
        in: filteredprods
      }
    }
  })

  const [order] = allorders
  const [product] = allproduct

  

  // const filtered = (or as Property[]).map(prod => prod.id)

//   const {docs : product } = await payload.find({
//     collection: 'property',
//     where: {
//         id: {
//             in: filtered.map(prod => prod)
//         }
//     }
// })

// const filteredProduct = product.filter( prod => Boolean(prod.price))




const Admins = allorders?.map(items => (items.products as Property[]).map((balance) => balance.price)).flat()


const AdminBalance = Admins?.reduce((total, balance) => {
  return total + (balance)
})

const UsersBalance = allUserOrders?.map(items => (items.products as Property[]).map((balance) => balance.price)).flat()

const userBalance = Admins?.reduce((total, balance) => {
  return total + (balance)
})
// const Adminbalance = allorders.reduce( (total, balance) => {
//   // return (balan)
// })

// const orderTotal = products.reduce((total, product) => {
//   return total + product.price
// }, 0)

  
  return (
    <div className='w-full lg:px-10 py-3 sm:h-screen'> 
      <div>
        <section className='flex justify-between w-full '>
          <div>
            <p className='flex text-muted-foreground text-sm'>Hello {user?.email}</p>
            <h3 className='font-bold text-md'>Wellcome Back!</h3>
          </div>
          <div className='flex '>
            <div className='flex justify-center items-center pl-2 max-md:hidden'>
              <Image 
              src='/hippo-email-sent.png'
              alt='profile image'
              width={50}
              height={50}
              />
            </div>
          </div>
        </section>

        <section>
        {!user ? '' : null}
          { user?.role == 'admin' ? (
            <div className='grid max-md:grid-cols-1 grid-cols-2 gap-6 py-6 grid-rows-2 '>
            <div className='shadow-md rounded-xl py-2'>
                <h2 className='px-4 py-4 font-semibold'>Profit and Available Balance</h2>
                <Separator />
                <div className='px-4'>
                  
                  <div className='flex h-full pt-8 py-4 px-4 items-center'>
                  <div className='flex-col h-40 w-40 rounded-full border-4 border-[#7623BA] flex justify-center items-center'>
                        <h3 className='font-semibold'>Balance</h3>
                        <p className='font-semibold '>NGN {AdminBalance}</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className=' shadow-lg rounded-xl py-2'>
                <h2 className='px-4 py-4 font-semibold'>Message From Tenants</h2>
                  <Separator />
                  <div className='px-4'>
                  {allmessages.slice(0,4).map(items => (
                        <div key={items.id}>
                            <div className='flex px-4 py-2'>
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300'>
                                <MessageCircleIcon color='#7623BA'/>
                              </div>
                              <div className='flex justify-between w-full'>
                              <div className='flex flex-col'>
                                <h2>{items.Email}</h2>
                                <p>{items.Subject}</p>
                              </div>
                              <div>
                                <h2>{items.Date}</h2>
                              </div>
                              </div>
                            </div>
                        </div>
                  ))}
                    
                  </div>
                  </div>
                  <div className=' shadow-lg rounded-xl py-2'>
                <h2 className='px-4 py-4 font-semibold'>Recent Payment Recieved</h2>
                  <Separator />
                  <div className='px-4'>
                  {/* {TenantMessage.map( props => ( */}
                  {allorders.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={item.id} className='flex px-4 py-2'>
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300'>
                                <MessageCircleIcon color='#7623BA'/>
                              </div>
                              <div className='flex justify-between w-full'>
                              <div className='flex flex-col'>
                                <h2>{item.unit_building}</h2>
                                <p>{item.Unit_name}</p>
                              </div>
                              <div>
                                {items.Status === 'Processing'? <h2 className='bg-purple-600 py-1 px-2 text-white'>{items.Status}</h2> : null}
                                {items.Status === 'Paid'? <h2 className='bg-red-600 py-1 px-2 text-white'>{items.Status}</h2> : null}
                                {items.Status === 'Failed'? <h2 className='bg-red-600 py-1 px-2 text-white'>{items.Status}</h2> : null}

                              </div>
                              <div>
                                <h2>{item.price}</h2>
                              </div>
                              </div>
                            </div>
                          ))}
                        </div>
                  ))}
                    
                  </div>
                  </div>
                  <div className=' shadow-lg rounded-xl py-2'>
                <h2 className='px-4 py-4 font-semibold'>Recent Members/Tenants</h2>
                  <Separator />
                  <div className='px-4'>
                  {/* {TenantMessage.map( props => ( */}
                  {allproduct.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={item.id} className='flex px-4 py-2'>
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300'>
                                <MessageCircleIcon color='#7623BA'/>
                              </div>
                              <div className='flex flex-col justify-between w-full'>
                              <div>
                                <h2>{items.Full_name}</h2>
                              </div>
                              <div className='flex flex-col'>
                                <h2>{item.unit_building}</h2>
                                <p>{item.Unit_name}</p>
                              </div>
                              </div>
                            </div>
                          ))}
                        </div>
                  ))}
                    
                  </div>
                  </div>
                  
            </div>
          ) : null }
          { user ? (
            <div>
            { user.role === 'user' ? (
             <div className='grid max-md:grid-cols-1 grid-cols-2 gap-6 py-6 grid-rows-2 '>
            <div className='shadow-md rounded-xl py-2'>
                <h2 className='px-4 py-4 font-semibold'>Profit and Available Balance</h2>
                <Separator />
                <div className='px-4'>
                  
                  <div className='flex h-full pt-8 py-4 px-4 items-center'>
                    <div className='flex-col h-40 w-40 rounded-full border-4 border-[#7623BA] flex justify-center items-center'>
                        <h3 className='font-semibold'>Balance</h3>
                        <p className='font-semibold '>NGN {UsersBalance.length !== 0 ? userBalance : '****'}</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className=' shadow-lg rounded-xl py-2'>
                <h2 className='px-4 py-4 font-semibold'>Profit and Available Balance</h2>
                  <Separator />
                  <div className='px-4'>
                  <h1>No data Available</h1>
                  </div>
                  </div>
                  <div className=' shadow-lg rounded-xl py-2 min-h-40 '>
                <h2 className='px-4 py-4 font-semibold'>Recent Payment Recieved</h2>
                  <Separator />
                  <div className='px-4'>
                  {/* {TenantMessage.map( props => ( */}
                  {allUserOrders.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={items.id} className='flex px-4 py-2'>
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300'>
                                <MessageCircleIcon color='#7623BA'/>
                              </div>
                              <div className='flex justify-between w-full'>
                              <div>
                                
                              <div className='flex '>
                                <h2 className='pr-2'>{item.unit_building}</h2>
                                <p>{item.Unit_name}</p>
                              </div>
                              <h1>{(items.createdAt).slice(0,10)}</h1>
                              </div>
                              <div>
                                {items.Status === 'Processing'? <h2 className='bg-purple-700 px-2 py-1 text-white'>{items.Status}</h2> : null
                                }
                                {items.Status === 'Paid'? <h2 className='bg-red-400 px-2 py-1 text-white'>{items.Status}</h2> : null
                                }
                                {items.Status === 'Failed'? <h2 className='bg-red-400 px-2 py-1 text-white'>{items.Status}</h2> : null
                                }
                              </div>
                              <div>
                                <h2>NGN {item.price}</h2>
                              </div>
                              </div>
                            </div>
                          ))}
                        </div>
                  ))}
                    
                  </div>
                  </div>
                  <div className=' shadow-lg rounded-xl py-2 min-h-48'>
                <h2 className='px-4 py-4 font-semibold'>Recent Members/Tenants</h2>
                <div className='min-h-44'>
                  <Separator />
                  <div className='px-4'>
                  {/* {TenantMessage.map( props => ( */}
                  {allUserproduct.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={items.id} className='flex px-4 py-2'>
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300'>
                                <MessageCircleIcon color='#7623BA'/>
                              </div>
                              <div className='flex justify-between w-full'>
                                <div>
                              <div>
                                <h2>{items.Full_name}</h2>
                              </div>
                              <div className='flex'>
                                <h2 className='pr-2'>{item.unit_building}</h2>
                                <p>{item.Unit_name}</p>
                              </div>
                              </div>
                              <div><h1>{(items.createdAt).slice(0,10)}</h1></div>
                              </div>
                            </div>
                          ))}
                        </div>
                  ))}
                    
                  </div>
                  </div>
                  </div>
                  
            </div>
            ) : null}
            </div>
          ) : null}
                  </section>
            </div>
      </div>
  )
}

export default page

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page