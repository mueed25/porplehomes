// pages/Announcement.js
'use client'
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/trpc/client';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  Email: string
  Subject: string
  Message: string
}

const Announcement = () => {

  const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

      const {mutate: createAnnouncement} = trpc.payment.createAnnouncement.useMutation({
        onSuccess: () => {
          console.log(true)
        }
      })

      const onSubmit: SubmitHandler<Inputs> = ({Email, Message, Subject}) => {
        createAnnouncement({Email, Message, Subject})
        router.push('/account/Communication')

      }

      

  return (
    <div className="w-full mt-8">
      <div className="flex w-full py-4 justify-center">
        <p className="text-white text-2xl font-bold px-4 py-2 rounded-full bg-porple">1</p>
      </div>

      <form className=" " onSubmit={handleSubmit(onSubmit)}>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 lg:px-4 max-lg:px-2 py-6'>
        <div className="mb-4">
          <Label htmlFor="messageTo" className="block text-sm font-medium text-gray-600">
            Message To
          </Label>
          <Input
            type="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter email address"
            {...register("Email", { required: 'Field is required' })}
          />
          {errors.Email && (
            <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="subject" className="block text-sm font-medium text-gray-600">
            Subject
          </Label>
          <Input
            type="text"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter subject"
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

        <div className='flex justify-center w-full'>
        <Button
          type="submit"
          className="bg-purple-500 max-md:w-full text-white py-2 px-8 rounded-md hover:bg-purple-600"
        >
          Send
        </Button>
        </div>
      </form>

      <div className="mt-8 w-full mb-4">
        <Link href="/account/Communication" className={buttonVariants({
          variant: 'link',
          className: 'max-md:w-full px-4 py-1'
        })}>
        Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Announcement;
