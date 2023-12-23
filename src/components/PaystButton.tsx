
import { PaystackButton } from 'react-paystack'

interface PageProps {
    amount: number
}
const PaystButton = (props: PageProps) => {
   

    const componentProps = {
        email: 'example@gmail.com',
        amount: props.amount,
        // metadata: {
        //   name,
        // //   phone,
        // },
        publicKey: 'sk_test_68a9954c345490c8e15133631bfcecc7008f712a',
        text: "Pay Now",
        onSuccess: () =>
          alert("Thanks for doing business with us! Come back soon!!"),
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
      }

  return (
    <div>
        
    </div>
  )
}

export default PaystButton