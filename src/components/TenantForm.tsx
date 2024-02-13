'use client'
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TTenantQueryValidator, TenantQueryValidator } from '@/lib/validators/Tenant-form-query';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';


const Form = ({
  productid
} : {
  productid: string
}) => {


  const router = useRouter()

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<TTenantQueryValidator>({
  //   resolver: zodResolver(TenantQueryValidator),
  // })

  const {mutate: Tenant} = trpc.payment.createTenant.useMutation({
    onSuccess: async () => {

      router.push('/account')
      router.refresh()
    }
  })

  // const onSubmit = ({
  //   Full_name,
  //   Phone_number,
  //   productId,
  //   City,
  //   State,
  //   Adress
  // }: TTenantQueryValidator) => {
  //   Tenant({
  //     Full_name,
  //     Phone_number,
  //     productId,
  //     City,
  //     State,
  //     Adress
  //   })

  // }

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="w-full  mx-auto mt-8 px-8 shadow-sm py-8">
  //     <div className='lg:grid-cols-3  grid lg:gap-4 gap-4 mt-4 '>
  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
  //         Full Name
  //       </label>
  //       <Input id="fullName" placeholder="Enter your full name" {...register('Full_name')}/>
  //     </div>

  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
  //         Phone Number
  //       </label>
  //       <Input id="phoneNumber" type="tel" placeholder="Enter your phone number" {...register('Phone_number')}/>
  //     </div>

  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
  //         Gender
  //       </label>

  //     </div>

  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
  //         Address
  //       </label>
  //       <Input id="address" placeholder="Enter your address" {...register('Adress')}/>
  //     </div>

  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
  //         City
  //       </label>
  //       <Input id="city" placeholder="Enter your city" {...register('City')}/>
  //     </div>

  //     <div className="mb-4">
  //       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
  //         State
  //       </label>
  //       <Input id="state" placeholder="Enter your state" {...register('State')}/>
  //     </div>
  //     </div>

  //   <div className='flex justify-end'>
  //     <Button type='submit'>
  //       Proceed
  //     </Button>
  //   </div>
      
  //   </form>

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TTenantQueryValidator>()
  const onSubmit: SubmitHandler<TTenantQueryValidator> = ({
    Full_name,
    Phone_number,
    City,
    State,
    Adress
  }) => {

    const productId = productid
    const Gender =  'male'
      Tenant({
      Full_name,
      Phone_number,
      productId,
      City,
      Gender,
      State,
      Adress
    })
  }

  console.log(watch("Full_name")) // watch input value by passing the name of 

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} className="w-full  mx-auto mt-8 px-8 shadow-md py-8">
      <div className='lg:grid-cols-3  grid lg:gap-4 gap-4 mt-4 '>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
          Full Name
        </label>
        <Input id="fullName" placeholder="Enter your full name" {...register('Full_name')}/>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
          Phone Number
        </label>
        <Input id="phoneNumber" type="tel" placeholder="Enter your phone number" {...register('Phone_number')}/>
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <Input id="address" placeholder="Enter your address" {...register('Adress')}/>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
          City
        </label>
        <Input id="city" placeholder="Enter your city" {...register('City')}/>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
          State
        </label>
        <Input id="state" placeholder="Enter your state" {...register('State')}/>
      </div>
      </div>

    <div className='flex justify-end w-full'>
      <Button type='submit' className='max-md:w-full'>
        Proceed
      </Button>
    </div>
      
    </form>

  );
};

export default Form;
