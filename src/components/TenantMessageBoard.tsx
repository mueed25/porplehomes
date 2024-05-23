// pages/Announcement.js
'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/p';
import { trpc } from '@/trpc/client';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  Message: string,
  Subject: string
}

console.log(String(Date.now()))

const TenantMessageBoard = ({Email}: {Email: string}) => {

  const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

      const {mutate: createAnnouncement} = trpc.payment.createMessage.useMutation({
        onSuccess: () => {
          console.log(true)
        }
      })

      const onSubmit: SubmitHandler<Inputs> = ({Message,Subject}) => {
        createAnnouncement({ Message, Email, Subject})
        router.push('/account')

      }

      

  return (
    <div className="w-full mt-8 px-4 shadow-sm pb-4">

      <form className=" " onSubmit={handleSubmit(onSubmit)}>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 lg:px-8  py-6'>
      <div className="mb-4">
          <Label htmlFor="messageTo" className="block text-sm font-medium text-gray-600">
            Subject
          </Label>
          <Input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Subject"
            {...register("Subject", { required: 'Field is required' })}
          />
          {errors.Subject && (
            <p className="text-red-500 text-sm mt-1">{errors.Subject.message}</p>
          )}
        </div>
        <div className="mb-4">
          <Label htmlFor="message" className="block text-sm font-medium text-gray-600">
            Message
          </Label>
          <textarea
            rows={4}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your message"
            {...register("Message", { required: 'Field is required' })}
          ></textarea>
          
          {errors.Message && (
            <p className="text-red-500 text-sm mt-1">{errors.Message.message}</p>
          )}
        </div>
        </div>

        <div className='flex md:justify-end md:px-4 md:w-full  pb-4'>
        <Button
          type="submit"
          className="bg-purple-500 max-md:w-full text-white py-2 px-4 rounded-md hover:bg-purple-600"
        >
          Send
        </Button>
        </div>
      </form>

    
    </div>
  );
};

export default TenantMessageBoard;
