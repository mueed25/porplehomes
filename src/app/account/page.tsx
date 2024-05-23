import { getServerSideUser } from '@/lib/payload.utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { notFound, redirect } from 'next/navigation'
import { Order, Property, PropertyFile, User } from '@/payload-types'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import PaymentStatus from '@/components/PaymentStatus'
import TenantMessageBoard from '@/components/TenantMessageBoard'
import { Suspense } from 'react'
import Loading from './loading'


const page = async () => {
  const nextCookies = cookies()

  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user?.id
      }
    },
  })

  const { docs: props } = await payload.find({
    collection: 'property',
    depth: 2,
    where: {
      user: {
        equals: user?.id
      }
    },
  })

  const [order] = orders

  if (user?.role === 'admin' ) {
    return redirect(
      `/account/Overview`
    )
  }


  const orderUserId =
    typeof order?.user === 'string'
      ? order.user
      : order?.user.id

  // if (orderUserId !== user?.id) {
  //   return redirect(
  //     `/sign-in?origin=thank-you?orderId=${order.id}`
  //   )
  // }

  if (!user) {
    return redirect(
      `/sign-in?origin=account`
    )
  }

  const products = order?.products as Property[]

  const orderTotal = products?.reduce((total, product) => {
    return total + product.price
  }, 0)

  const Email = user?.email
  const {docs: Orders} = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
        user: {
            equals: user.id
        }
    }
})

console.log(Orders)

  return (
    <main className=' lg:min-h-screen min-h-screen flex flex-col justify-between w-full '>


    {/* <Suspense fallback={<Loading />}> */}
      <div>
      {user ? <div>
        <div className=' py-8 sm:px-6 sm:py-8 lg:grid lg:grid-cols-2 lg:px-8 px-4'>
            <div className='mt-8 text-sm font-medium'>
              <ul className='mt-4 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                {(order?.products as Property[]).map(
                  (product) => {
                    const downloadUrl = (
                      product.property_files as PropertyFile
                    ).url as string

                    const { images } = product.images[0]

                    return (
                      <li
                        key={product.id}
                        className='flex space-x-6 py-6'>
                        <div className='relative h-24 w-24'>
                          {typeof images !== 'string' &&
                          images.url ? (
                            <Image
                              fill
                              src={images.url}
                              alt={`${product.name} image`}
                              className='flex-none rounded-md bg-gray-100 object-cover object-center'
                            />
                          ) : null}
                        </div>

                        <div className='flex-auto flex flex-col justify-between'>
                          <div className='space-y-1'>
                            <h3 className='text-gray-900'>
                              {product.name}
                            </h3>

                            <div className='flex flex-col'>
                              <p>Category: {product.Property_type}</p>
                              <p>Duration: {product.Days}</p>
                              <p>Status: { order.Status === 'Paid'?  'Occupied' : 'Processing'}</p>
                            </div>
                          </div>

                          {order._isPaid ? (
                            <a
                              href={downloadUrl}
                              download={product.name}
                              className='text-blue-600 hover:underline underline-offset-2'>
                              Download asset
                            </a>
                          ) : null}
                        </div>

                        <p className='flex-none font-medium text-gray-900'>
                          {formatPrice(product.price)}
                        </p>
                      </li>
                    )
                  }
                )}
              </ul>
          </div>
        </div>
      </div> : null}
      </div>

      <div>
      {user? <TenantMessageBoard Email={Email} /> : null}
      </div>
      {/* </Suspense> */}
    </main>
  )
}

export default page
