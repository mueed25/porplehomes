import AddToProfile from '@/components/AddToProfile'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { Button, buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/getPayloadClient'
import { formatPrice } from '@/lib/utils'
import { Check, ComputerIcon, Home, Shield, DoorOpen, Warehouse } from 'lucide-react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'
import Add from '@/components/Add'

interface PageProps {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/' },
]

const Page = async ({ params }: PageProps) => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)



  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'property',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  // const {mutate: createCheckoutSession} = trpc.payment.createSession.useMutation({
    
  // })

  const [product] = products

  if (!product) return notFound()

  const validUrls = product.images
    .map(({ images }) =>
      typeof images === 'string' ? images : images.url
    )
    .filter(Boolean) as string[]

    

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {product.name}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  {formatPrice(product.price)}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {product.Property_type}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product.description}
                </p>
              </div>

              <div className='mt-4 flex items-center '>
                <DoorOpen />
                <p className='ml-2 text-sm font-medium '>
                  {product.Bedrooms}-Bedrooms
                </p> 
              </div>
              <div className='mb-2 mt-1  flex items-center' >
              <Warehouse />
              <h2 className='text-sm font-medium ml-2'>
                {product.Company_name}.
              </h2>
              </div>
              <div className='flex flex-col'>
              
              <div className='mt-2 flex items-center'>
                <Check
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-green-500'
                />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Duration of {product.Days} days. 
                </p> 
              </div>
               
                <div className='mt-2 flex items-center'>
                <Check
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-green-500'
                />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Eligible for instant tour and reservation 
                </p> 
              </div>
                
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-10'>
                {user? (<AddToProfile mail={user.email} amount={product.price} productid={productId}/>) : (<Add productid={productId}/>)}
              </div>
              <div className='mt-6 text-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <Shield
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                  />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    Guarantee Trust and Lively
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href='/products'
        query={{ state: product.state,  limit: 4 }}
        title={`Similar ${product.Property_type}`}
        subtitle={`Browse similar high-quality ${product.Property_type} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  )
}

export default Page
