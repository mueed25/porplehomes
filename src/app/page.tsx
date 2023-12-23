'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '../components/ProductReel';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { useState } from 'react';
import { TFilterQueryValidator } from '@/lib/validators/filter-query-validator';

export default function Home() {

  const [query, setquery] = useState<TFilterQueryValidator>({})


  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TFilterQueryValidator>()

  const onSubmit: SubmitHandler<TFilterQueryValidator> = (data) => {
    setquery(data)
  }

  console.log(query.beds);
  
  

  return (
    <div className=''>

    <MaxWidthWrapper>
        <div className="mt-2 shadow-xl rounded-2xl py-2">
            <form onSubmit={handleSubmit(onSubmit)} className=" flex max-md:flex-col">
                <div className="grid md:grid-cols-3 md:gap-4 px-4 w-full">
                <div className="flex ">
                    <div className="w-full">
                    <Label htmlFor="Budget">Cities</Label>
                    <Input {...register('state')} type="text" className="md:border-0 " placeholder="All Cities"/>
                    </div>
                    <div className="flex items-end max-md:hidden">
                    <span
                      className='h-8 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    </div>
                </div >
                <div className="flex max-md:my-2">
                    <div className="w-full">
                    <Label htmlFor="Budget">Property Size</Label>
                    <Input {...register('beds')} type="number" className="md:border-0 " placeholder="Bedrooms"/>
                    </div>
                    <div className="flex items-end max-md:hidden">
                    <span
                      className='h-8 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    
                    
                    </div>
                </div >
                <div className="flex ">
                    <div className="w-full">
                    <Label htmlFor="Budget">Budget</Label>
                    <Input {...register('price')} type="number" className="md:border-0 " placeholder="Max. Prices"/>
                    </div>
                    <div className="flex items-end max-md:hidden">
                    <span
                      className='h-8 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    </div>
                </div >
                </div>
                <div className="flex justify-end items-end  max-md:w-full px-2 max-md:px-4 max-md:mt-2">
                <Button className="max-md:w-full">Filter</Button>
                </div>
            </form>
        </div>
    </MaxWidthWrapper>

        <MaxWidthWrapper className=''>
          <div className=''>
           <ProductReel 
           query={{ sort: 'desc', limit: 4 ,}}
           href='/products?sort=recent'
           title='Brand new'
         />
          </div>
        </MaxWidthWrapper>
    </div>
  )
}