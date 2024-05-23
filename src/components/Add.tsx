'use client'
import { Property, User } from "@/p"
import { Button } from "./ui/button"
import { usePaystackPayment } from "react-paystack"
import { trpc } from "@/trpc/client"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { notFound, redirect } from 'next/navigation'




const Add =  ({
   productid
}: { 
  productid: string
}) => {

  const router = useRouter()

    interface PropsType {
        productid: String
    }
  const handleClick = (props: PropsType)=> {

    router.replace(`/sign-in?origin=product/${productid}`)
    router.refresh()

  //   if (productid) {
  //       return redirect(
  //         `/sign-in?origin=product/${productid}`
  //       )
  //     }
  }


  return (
    <Button onClick={ () => {
      handleClick({productid})
    }} className="w-full">
      proceed to pay
    </Button>
  )
}

export default Add


