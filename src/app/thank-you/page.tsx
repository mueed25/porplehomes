import { getServerSideUser } from '@/lib/payload.utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayloadClient'
import { notFound, redirect } from 'next/navigation'
import { Property, PropertyFile, User } from '@/p'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import PaymentStatus from '@/components/PaymentStatus'
import TenantForm from '@/components/TenantForm'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

interface PageProps {
  searchParams: {
    [key: string]: string 
  }
}

const ThankYouPage = async ({
  searchParams,
}: PageProps) => {
  const productid = searchParams.orderId
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

  if (!order) return notFound()

  const orderUserId =
    typeof order.user === 'string'
      ? order.user
      : order.user.id

  if (orderUserId !== user?.id) {
    return redirect(
      `/sign-in?origin=thank-you?orderId=${productid}`
    )
  }

  const products = order.products as Property[]

  const orderTotal = products.reduce((total, product) => {
    return total + product.price
  }, 0)

  

  return (
    <main className=' lg:min-h-full '>
      <div>
        <div className=''>
          <MaxWidthWrapper>
          <div className='lg:col-start-2  py-6 lg:px-4 max-lg:px-2'>
            <p className='text-sm font-medium text-blue-600'>
              Payment successful
            </p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Thanks 
            </h1>
            {order._isPaid ? (
              <p className='mt-2 text-base text-muted-foreground'>
                Your payment was processed. We&apos;ve sent
                your receipt and order details to{' '}
                {typeof order.user !== 'string' ? (
                  <span className='font-medium text-gray-900'>
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className='mt-2 text-base text-muted-foreground'>
                We appreciate your payment, and we&apos;re
                currently processing it. So hang tight and
                we&apos;ll send you confirmation very soon!
              </p>
            )}

            <p className='text-muted-foreground mt-2'>Proceed with the tenant application form</p>

            <TenantForm productid={productid}/>

          </div>
          </MaxWidthWrapper>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage

