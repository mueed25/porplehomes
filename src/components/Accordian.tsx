import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Property } from '@/payload-types';
import QRCode from "react-qr-code"
import { Separator } from './ui/separator';

interface Props {
    properties: Property[]
}

const Accordian = (properties: Props) => {
  return (
  <div>
  {properties.properties.map( (property, index) =>  {
    return (
      <div key={index}>
        <Accordion type="single" collapsible> 
          <div>
          <AccordionItem value={property.id}>
            <AccordionTrigger>
              <h1 className='font-bold text-md'>{property.name}</h1>
              </AccordionTrigger>
            <AccordionContent>
              <p className='text-muted-foreground text-md '>Below is the property Qrcode for direct access to the property web page </p>
              <div className='pt-8 w-full flex justify-center flex-col'>
                <Separator />
                <h2 className='flex justify-center text-lg font-semibold pt-4 pb-4 text-center'>Scan the Qrcode to BUY/RENT or pay your due rent </h2>
                <div className='flex justify-center bg-white shadow-sm'><QRCode value={`http://www.porplehomes.com/product/${property.id}`} /></div>
                <h2 className='flex justify-center text-lg font-semibold py-2 pt-6 text-center'>Or Contact {property.Comapany_Contact_number} </h2>
              </div>
            </AccordionContent>
          </AccordionItem>
          </div>
          </Accordion>
        </div>
      )
    })}
      
    </div>
  )
}

export default Accordian