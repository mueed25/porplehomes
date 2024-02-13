'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { useState } from 'react';
import Image from 'next/image'
import { ArrowDown, ArrowRightCircleIcon, ArrowLeft, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod'
import { TFilterQueryValidator, FilterQueryValidator } from '@/lib/validators/filter-query-validator';


const HomeComp = () => {

    const [queries, setqueries] = useState<TFilterQueryValidator>({})

    const cat = [
        {
          image: '/homepage2.png',
          heading: 'Transparent pricing',
          text: 'See fixed and accurate verified prices that are verified with us'
        },
        {
          image: '/homepage2.png',
          heading: 'Experts Only',
          text: 'Have the most expertise workers on your call'
        },
        {
          image: '/homepage3.png',
          heading: 'Fully Equiped',
          text: 'See through diffrent properties that are fully equiped with all your needs'
        },
      ]
    
      const category = [
        {
          image: '/homepage1.png',
          button: <ArrowRightCircleIcon />,
          text: 'Browse more of this collection'
        },
        {
          image: '/homepage2.png',
          button: <ArrowRightCircleIcon />,
          text: 'Browse more of this collection'
        },
        {
          image: '/homepage3.png',
          button: <ArrowRightCircleIcon />,
          text: 'Browse more of this collection'
        },
      ]
    

      const [searching, setsearching] = useState(false)

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TFilterQueryValidator>({
        resolver: zodResolver(FilterQueryValidator),
      })

      const onSubmit = (props : TFilterQueryValidator) => {
        setsearching(prev => {return true})
        setqueries(( ) => {
        return props
        })
        
      }

  return (
    <div>
          {searching? (
      <div className=' '>
      <section className='flex relative h-screen w-full  justify-center items-center'>
        <MaxWidthWrapper>

      <div className='flex justify-center items-center  py-8 pt-8'>
        <form onSubmit={handleSubmit(onSubmit)}  className='grid lg:grid-cols-5 grid-cols- lg:gap-4 gap-4 py-8 max-lg:w-4/5 px-4 shadow-lg rounded-md bg-white'>
        <div>
        <label htmlFor="Property Type" className='text-muted-foreground px-2 py-2 font-light'>LOOKING FOR</label>
        <Input type='text' placeholder='Property type' {...register('property')}/>
        </div>
        <div>
        <label htmlFor="Property Type" className='text-muted-foreground px-2 py-2 font-light'>LOCATION</label>
        <Input type='text' placeholder='Cities' {...register('state')}/>
        </div>
        <div>
        <label htmlFor="Bedrooms " className='text-muted-foreground px-2 py-2 font-light'>PROPERTY SIZE</label>
        <Input type='number' placeholder='No. Bedrooms' {...register('beds')}/>
        </div>
        <div>
        <label htmlFor="Price" className='text-muted-foreground px-2 py-2 font-light'>BUDGETS</label>
        <Input type='number' placeholder='Max. Price' {...register('price')}/>
        </div>
        <div className='flex justify-start items-end '>
          <Button className='w-full'>Search</Button>
        </div>
        </form>
          
      </div>
      </MaxWidthWrapper>
      </section>

      <section className='pt-8'>
         <MaxWidthWrapper className=''>
          <button className='text-[#7623BA]' onClick={
            () => (
              setsearching(prev => {return !prev})
            )
          }>
          <ArrowLeft />
          </button>
          <div className=''>
           <ProductReel 
           query={{ sort: 'desc', limit: 4 , category: queries?.property, Bedrooms: Number(queries.beds), state: queries?.state}}
           href='/products?sort=recent'
           title='View from our properties'
         />
          </div>
        </MaxWidthWrapper> 
        </section>
      </div>
     ) : (
      <div>
      <section className='w-full h-screen flex justify-center items-center  px-10 relative '>
      <MaxWidthWrapper className='text-center borde '>
      <div className='text-white'>
      <h1 className='lg:text-[4rem] text-[2.5rem] font-semibold' >Find Your Perfect Home</h1>
      <h3 className='lg:text-[1.5rem] text-[1.2rem] pt-3 font-light'>Take control and find your perfect home. We buy and sell properties across the country . Our properties are available to buy, rent and lease. Take a tour of our properties</h3>
      </div>

     
      </MaxWidthWrapper>
      </section>

      <section className='flex relative'>
        <MaxWidthWrapper>
      <div className='flex justify-center items-center  py-8 pt-8'>
        <form  onSubmit={handleSubmit(onSubmit)} className='grid lg:grid-cols-5 grid-cols- lg:gap-4 gap-4 py-8 max-lg:w-4/5 px-4 shadow-lg rounded-md lg:absolute lg:-top-full bg-white'>
        <div>
        <label htmlFor="Property Type" className=' px-2 py-2 font-normal'>LOOKING FOR</label>
        <Input type='text'
        {...register('property')} 
        placeholder='Property type' 
        />
        </div>
        <div>
        <label htmlFor="Property Type" className=' px-2 py-2 font-normal'>LOCATION</label>
        <Input type='text' 
        placeholder='Cities' 
        {...register('state')}/>
        </div>
        <div>
        <label htmlFor="Bedrooms " className=' px-2 py-2 font-normal'>PROPERTY SIZE</label>
        <Input type='number' 
        placeholder='No. Bedrooms' 
        {...register('beds')}
       />
       <p>{errors.beds?.message}</p>
        </div>
        <div>
        <label htmlFor="Price" className=' px-2 py-2 font-normal'>BUDGETS</label>
        <Input type='number' 
        placeholder='Max. Price' 
        {...register('price')}
        />
        <p>{errors.price?.message}</p>
        </div>
        <div className='flex justify-start items-end '>
          <Button className='w-full'>Search</Button>
        </div>
        </form>
          
      </div>
      </MaxWidthWrapper>
      </section>

      <section className=' w-full  pb-8'>
        <MaxWidthWrapper >
          <div className='py-16 max-lg:px-6 grid lg:grid-cols-3  gid-cols-1 gap-8'>
          {category.map( (list, index) => (
            
            <Link
            className=' shadow-md rounded-lg hover:rounded'
            key={index} 
            href='/'
            >
              <div className='relative h-[300px]'>
              <Image alt='category image' src={list.image} fill/>
              </div>
              <div className='flex py-6 px-4 hover:bg-[#7623BA]  hover:text-white'>
                <div className='flex h-6 w-6 justify-center items-center shadow-lg rounded-full'>{list.button}</div>
                <p className='px-2'>{list.text}</p>
              </div>
            </Link>
          ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <section className='py-6 max-lg:px-4 '>
        <MaxWidthWrapper className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
          <div>
            <h1 className='text-[2rem]' >Why Porplehomes?</h1>
            <div className='pt-4'>
              {cat.map((list, index) => (
                <div className='flex py-4' key={index}>
                  <div className='flex pr-4  justify-center items-center'>
                  <Image alt='logo' className='rounded-full shadow-lg' src={list.image} width={50} height={50} />
                  </div>
                  <div>
                    <h3 className='text-[1.2rem]'>{list.heading}</h3>
                    <p className='text-muted-foreground'>{list.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className='h-full w-full relative flex items-center max-lg:h-[400px] max-lg:pt-16'>
          <div className='h-full w-full absolute flex items-center justify-end'>
            <div className='h-full w-10/12 border flex justify-end relative'>
                  <Image src='/homepage3.png' alt='image' className='absolute' fill />
            </div>
            </div>
            <div className='bg-yellow-400 h-4/5 w-full '></div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className='py-16'>
        <MaxWidthWrapper className=''>
        <div className='flex flex-col justify-center items-center py-16 px-2 bg-yellow-100'>
                <h1 className='lg:text-xl text-lg font-semibold text-center'>Book an instant property tour</h1>
                <p className='text-muted-foreground md:text-base text-center'>Enter your mobiles number to recieve an instant call from us</p>
                
        <form className="max-w-sm mx-auto">
            <div className="relative flex pl-2 rounded-xl  border shadow-md bg-white mt-4">
                    <div className=' flex justify-center items-center'>
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                    </svg>
                    </div>
                    <div className='grid grid-cols-2 pl-2'>
                <Input type="text"  aria-describedby="helper-text-explanation" className="bg-gray-50 border-0 text-muted-foreground text-sm rounded-lg  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="08100190109" />
                <Button className='rounded-xl'>Send</Button>
                </div>
            </div>
        </form>

        </div>
        </MaxWidthWrapper>
      </section>

        <section className='pt-8'>
         <MaxWidthWrapper className=''>
          <div className=''>
           <ProductReel 
           query={{ sort: 'desc', limit: 20 ,}}
           href='/products?sort=recent'
           title='View from our properties'
         />
          </div>
        </MaxWidthWrapper> 
        </section>
        </div>
)}
    </div>
  )
}

export default HomeComp