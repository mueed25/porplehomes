'use client'
import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import {  Globe, Search,  } from 'lucide-react'
  import { Button } from "./ui/button"
  import { zodResolver } from '@hookform/resolvers/zod'
import { TFilterQueryValidator, FilterQueryValidator } from '@/lib/validators/filter-query-validator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; 



const Drawers = () => {

  const [queries, setqueries] = useState<TFilterQueryValidator>({})


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFilterQueryValidator>({
    resolver: zodResolver(FilterQueryValidator),
  })

  const onSubmit = (props : TFilterQueryValidator) => {
    // setsearching(prev => {return true})
    setqueries(( ) => {
    return props
    })
    
  }


  return (
    <div>
    <Drawer>
    <DrawerTrigger>
  <div className='flex'>
    <div className='flex px-2 py-2 shadow-md rounded-full mr-2'>
        <Search />
    </div>
  </div>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Find the perfect place for you?</DrawerTitle>
      <DrawerDescription>
      <form  onSubmit={handleSubmit(onSubmit)} className='pt-2 grid lg:grid-cols-5 grid-cols- lg:gap-4 space-y-4'>
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
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>
        <Button className='w-full' variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
    </DrawerContent>
  </Drawer>

    </div>
  )
}

export default Drawers