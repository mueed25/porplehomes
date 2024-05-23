import {MessageCircleIcon, Search, FlipVertical, Landmark, ClipboardType, Eye} from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { DataTableDemo } from '@/components/DataTable'
import Visible from '@/components/Visible'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { Property } from '@/payload-types'
import { cn, formatPrice } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading'



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

  // const filteredprods = prods.map( prod => (prod.products as Property[])?.map( pro => pro.id)).flat()
  const filteredprods = prods.map(prods => (
    prods.products? (prods.products as Property[]).map(prod => prod.id) : [] )
  ).flat()


  const { docs: allorders } = await payload.find({
    collection: 'orders',
    depth: 2,
  })

  const { docs: allmessages } = await payload.find({
    collection: 'TenantM',
    depth: 2,
  })

  console.log(allmessages)

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
            <h3 className='font-bold text-md text-purple-800'>Wellcome Back!</h3>
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
                  <div className='flex h-full pt-8 py-4 px-4 items-center justify-between'>
                  <div className='flex-col h-40 w-40 rounded-full border-8 border-[#7623BA] flex justify-center items-center'>
                        <h3 className='font-semibold'>Balance</h3>
                        {/* <p className='font-semibold '>NGN {AdminBalance}</p> */}
                        <div><Visible balance={AdminBalance} /></div>
                        
                    </div>
                    <div className=' flex flex-col  px-10 align-left max-sm:hidden'>
                      <div className='flex items-center'><div className='w-4 h-4 mx-2 bg-purple-600'></div> <h1 className='font-semibold'>Tenant Rent Fees</h1></div>
                      <div className='flex py-4 items-center'><div className='w-4 h-4 mx-2 bg-purple-600'></div> <h1 className='font-semibold'>Landloard Registration</h1></div>
                      <div className='flex items-center'><div className='w-4 h-4 mx-2 bg-purple-600'></div> <h1 className='font-semibold'>Agent Registration</h1></div>
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
                              <div className='max-sm:hidden'>
                                <h2>{items.Date}</h2>
                              </div>
                              </div>
                            </div>
                        </div>
                  ))}
                    
                  </div>
                  </div>
                  <div className=' shadow-lg rounded-xl py-2'>
                <h2 className='px-4 py-4 text-md font-bold text-purple-800'>Recent Payment Recieved</h2>
                  <Separator />
                  <div className='px-4'>
                  {/* {TenantMessage.map( props => ( */}
                  {allorders.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={item.id} className='flex px-4 py-2'>
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300 rounded-md'>
                                <Landmark color='#7623BA'/>
                              </div>
                              <div className='flex justify-between w-full'>
                              <div className='flex flex-col'>
                                <h2 className='font-bold'>{item.unit_building}</h2>
                                <p>{item.Unit_name}</p>
                              </div>
                              <div className='max-sm:hidden'>
                                {items.Status === 'Processing'? <h2 className='bg-purple-600 py-1 px-2 text-white rounded-md'>{items.Status}</h2> : null}
                                {items.Status === 'Paid'? <h2 className='bg-red-600 py-1 px-2 text-white rounded-md'>{items.Status}</h2> : null}
                                {items.Status === 'Failed'? <h2 className='bg-red-600 py-1 px-2 text-white rounded-md'>{items.Status}</h2> : null}

                              </div>
                              <div>
                                <h2 className='font-bold'>NGN {item.price}</h2>
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
                              <div className='flex justify-center items-center px-2 mx-2  bg-purple-300 rounded-md'>
                                <ClipboardType color='#7623BA'/>
                              </div>
                              <div className='flex flex-col justify-between w-full'>
                              <div>
                                <h2 className='font-bold'>{items.Full_name}</h2>
                              </div>
                              <div className='flex '>
                                <h2>{item.unit_building} ,</h2>
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
                <h2 className='px-4 py-4 font-bold text-md text-purple-800'>Profit and Available Balance</h2>
                <Separator />
                <div className='px-4'>
                  
                  <div className='flex h-full pt-8 py-4 px-4 items-center'>
                    <div className='flex-col h-40 w-40 rounded-full border-8 border-[#7623BA] flex justify-center items-center'>
                        <h3 className='font-semibold'>Balance</h3>
                        <p className='font-semibold '>NGN {UsersBalance.length !== 0 ? userBalance : ' **** '}</p>
                    </div>
                    <div>
                    <div className=' flex flex-col  px-10 align-left max-sm:hidden'>
                      <div className='flex items-center'><div className='w-4 h-4 mx-2 bg-purple-600'></div> <h1 className='font-semibold'>Tenant Rent Fees</h1></div>
                      <div className='flex py-4 items-center'><div className='w-4 h-4 mx-2 bg-purple-600'></div> <h1 className='font-semibold'>Landloard Registration</h1></div>
                      <div className='flex items-center'><div className='w-4 h-4 mx-2 bg-purple-600'></div> <h1 className='font-semibold'>Agent Registration</h1></div>
                    </div>
                    </div>
                  </div>
                </div>
        </div>


        <div className=' shadow-md rounded-xl py-2'>
            <div className=''> 
            <h2 className='px-4 py-4 font-bold text-md text-purple-800'>Profit and Available Balance</h2>
              
            </div>
                  <Separator />
                  <div className=' px-4 flex justify-center items-center  text-bold max-sm:h-48'>
                  <h1 className=''>Not Found</h1>
                  </div>
            </div>


            <div className=' shadow-md rounded-xl py-2 min-h-40 '>
                <h2 className='px-4 py-4 font-bold text-md text-purple-800'>Recent Payment Recieved</h2>
                  <Separator />
                  <div className='px-4 max-sm:h-48'>
                  {/* {TenantMessage.map( props => ( */}
                  {allUserOrders.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={items.id}>
                            {(items.products as Property[]).map(item => (
                              <div key={item.id} className='flex px-4 py-2'>
                                <div className='flex justify-center items-center px-2 mx-2  bg-purple-300 rounded-md'>
                                  <Landmark color='#7623BA'/>
                                </div>
                                <div className='flex justify-between w-full'>
                                <div className='flex flex-col'>
                                  <h2 className='font-bold'>{item.unit_building}</h2>
                                  <p>{item.Unit_name}</p>
                                </div>
                                <div className='max-sm:hidden'>
                                  {items.Status === 'Processing'? <h2 className='bg-purple-600 py-1 px-2 text-white rounded-md'>{items.Status}</h2> : null}
                                  {items.Status === 'Paid'? <h2 className='bg-red-600 py-1 px-2 text-white rounded-md'>{items.Status}</h2> : null}
                                  {items.Status === 'Failed'? <h2 className='bg-red-600 py-1 px-2 text-white rounded-md'>{items.Status}</h2> : null}
  
                                </div>
                                <div>
                                  <h2 className='font-bold'>NGN {item.price}</h2>
                                </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          ))}
                        </div>
                  ))}
                    
                  </div>
              </div>


            <div className=' shadow-md rounded-xl py-2 min-h-48 '>
                <h2 className='px-4 py-4 font-bold text-md text-purple-800'>Recent Members/Tenants</h2>
                <div className='min-h-44'>
                  <Separator />
                  <div className='px-4 max-sm:h-48'>
                  {/* {TenantMessage.map( props => ( */}
                  {allUserproduct.slice(0,4).map(items => (
                        <div key={items.id}>
                          {(items.products as Property[]).map(item => (
                            <div key={items.id}>
                            {(items.products as Property[]).map(item => (
                              <div key={item.id} className='flex px-4 py-2'>
                                <div className='flex justify-center items-center px-2 mx-2  bg-purple-300 rounded-md'>
                                  <ClipboardType color='#7623BA'/>
                                </div>
                                <div className='flex flex-col justify-between w-full'>
                                <div>
                                  <h2 className='font-bold'>{items.Full_name}</h2>
                                </div>
                                <div className='flex '>
                                  <h2>{item.unit_building} ,</h2>
                                  <p>{item.Unit_name}</p>
                                </div>
                                </div>
                              </div>
                            ))}
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