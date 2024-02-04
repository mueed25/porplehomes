'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';


const Page = () => {

  const router = useRouter()
  const steps = ['step 1', 'step 2', 'step 3']
  const [currentState, setcurrentState] = useState(1)

  type Inputs = {
    Full_name: string;
    Phone_number: string;
    Adress: string;
    Email: string;
    City: string;
    State: string;
    Unit_name: string;
    Unit_building: string;
    Unit_category: string;
  }
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Inputs>()

    const {mutate: createTenant} = trpc.payment.createTenant1.useMutation({
        onSuccess: () => {
          router.push('/account/People')
        }
      })

    const onSubmit: SubmitHandler<Inputs> = ({
      Full_name,
      Phone_number,
      Adress,
      Email,
      City,
      State,
      Unit_name,
      Unit_building,
      Unit_category,
    }) => {
      createTenant({
        Full_name,
        Phone_number,
        Adress,
        Email,
        City,
        State,
        Unit_name,
        Unit_building,
        Unit_category,
      })

    }

      // id: string;
      // Full_name: string;
      // Phone_number: string;
      // Adress: string;
      // Email: string;
      // City: string;
      // State: string;
      // Unit_name: string;
      // Unit_building: string;
      // Unit_category: string;
      // updatedAt: string;
      // createdAt: string;

  return (
    <div className='w-full'>
      <div className='flex pt-6 px-4 pb-4  flex-col'>
        <Link href='/account/People'  className={buttonVariants({
          variant: 'link',
          className: 'text-muted-foreground  h-8 w-16 mb-2'
        })}>
        Go back
        </Link>
        
        <h2 className=' flex items-center'>People - Add a Tenant</h2>
      </div>
    <div className='mt-3 w-full flex pt-8  flex-col px-6 shadow-md rounded-md py-8'>
      <div className='flex justify-center'>
      {
        steps.map((item, index) => (
          <div key={index} className={`relative flex flex-col justify-center items-center step w-36 ${currentState === index + 1 && 'active'}`} >
            <div className='flex w-10 h-10 items-center justify-center z-10 relative steps bg-purple-900 rounded-full font-semibold text-white '>{index + 1}</div>
            <p className='text-white'>{item}</p>
          </div>
        ))
      }
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {currentState === 1 ? (
              <div className=' grid lg:grid-cols-3 grid-cols-1 gap-4 px-4 py-8'>
               <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Full Name
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Full_name')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Phone Number
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Phone_number')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Email
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Email')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
              </div>
            ) : null}
            {currentState === 2 ? (
              <div className=' grid lg:grid-cols-3 grid-cols-1 gap-4  px-4 py-8'>
                <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Adress
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Adress')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  City
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('City')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  State
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('State')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
              </div>
            ) : null}
            {currentState === 3 ? (
              <div className=' grid lg:grid-cols-3 grid-cols-1 gap-4  px-4 py-8'>
                <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Unit Name
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Unit_name')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Unit Building
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Unit_building')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  Unit Category
                </Label>
              <Input
                type="text"
                id="firstName"
                {...register('Unit_category')}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className=''>
            <Button>Submit</Button>
            </div>
              </div>
            ) : null}
            
        </form>
      </div>
      {currentState === 3 ? null : <div className='flex w-full  justify-between '>
      
      {
        currentState === 1 ? null : (
          <button onClick={() => { currentState === steps.length ? setcurrentState(1) :
            setcurrentState((prev)=> prev - 1)
          }} className='px-4 py-2 bg-purple-600 mt-6 text-white'>{
            currentState === 1 ? null : 'Preview'
          }</button>
        )
      }

      <button onClick={() => { currentState === steps.length ? setcurrentState(1) :
        setcurrentState((prev)=> prev + 1)
      }} className='px-4 py-2 bg-purple-600 mt-6 text-white'>{
        currentState === steps.length ? 'Finished' : 'Next'
      }</button>
      </div>}
    </div>
    </div>
  )
}

export default Page