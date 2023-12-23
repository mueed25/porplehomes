'use client'
import { Property, User } from "@/payload-types"
import { PaystackButton } from "react-paystack"
import { buttonVariants } from "./ui/button";



const AddToCartButton =  ({
  product,
}: {
  product: Property, 
}) => {



  const config = {
    reference: (new Date()).getTime().toString(),
    email: 'example@gmail.com',
    amount: product.price, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_84cbd3c68a85b3a2538633f312d0510170dc4d6d',
  };
  

  const handlePaystackSuccessAction = (reference: Date) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
      ...config,
      text: 'Proceed to pay ',
      onSuccess: (reference: Date) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
  };


  return (

    <PaystackButton className={buttonVariants({
      className: 'w-full'
    })} {...componentProps} />
  )
}

export default AddToCartButton
