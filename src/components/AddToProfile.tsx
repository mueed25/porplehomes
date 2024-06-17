'use client'
import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Button } from './ui/button';
import { trpc } from '@/trpc/client';
import  {useRouter} from 'next/navigation'
import { User } from '@/payload-types';

const AddToProfile =  ({
  productid, 
  mail,
  amount
}: { 
 productid: string,
 mail: string,
 amount: number
}) => {
  const router = useRouter()

  var data = ''
  const { mutate: createCheckoutSession, isLoading  } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ id }) => {
        data = id
      },
    })


    
  const config = {
    public_key: 'FLWPUBK_TEST-38935239633287a4c8644135ab2e4bf2-X',
    tx_ref: String(Date.now()),
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: mail,
       phone_number: '',
      name: '',
    },
    customizations: {
      title: 'my Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment =  useFlutterwave(config);

  return (
    <div className="">
      <Button
      className='w-full'
        onClick={() => {
          createCheckoutSession({productid})
          handleFlutterPayment({
            callback: (response) => {
              
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
                router.replace(`/thank-you?orderId=${productid}`)
            },
            onClose: () => {},
          });
        }}
      >
        Proceed to pay the amount
      </Button>
    </div>
  );
}

export default AddToProfile