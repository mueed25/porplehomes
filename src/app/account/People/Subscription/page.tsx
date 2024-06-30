'use client'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'


const page = () => {
  return (
    <div className=' sm:pt-4 flex justify-center  w-full'>
      <MaxWidthWrapper>
        
        <div className='pb-2'>
          <div className='max-sm:pt-4 flex flex-col justify-center w-full'>
          <h1 className='font-semibold text-2xl '>Upgrade To Add More</h1>
          <p className='text-muted-foreground'>Upgrade and get access to most of the cool features using the plans before.</p>
          </div>

          <div className='flex justify-center max-sm:pt-6 pt-8 max-md:flex-col  max-md:justify-center pb-6'>
            <div className='md:mr-4'><Card>
                <CardHeader>
                <CardTitle>Standard</CardTitle>
                  <CardDescription>Upgrade to premium standard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center'><p className='pr-2'>NGN</p><h1 className='text-6xl'>8000</h1></div>
                  <div className='pt-4'>
                  <h3 className='font-semibold text-xl'>Standard Plan Features</h3>
                  <div className='flex flex-col flex-start'>
                    <li className='text-muted-foreground'>Access to basic articles</li>
                    <li className='text-muted-foreground'>Weekly digest newsletter</li>
                    <li className='text-muted-foreground'>Community forum access</li>
                    <li className='text-muted-foreground'>Limited customer support</li>
                  </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className='w-full'>Subscribe</Button>
                </CardFooter>
              </Card>
            </div>
            <div className='md:ml-4 max-md:pt-6 max-md:pb-6'><Card>
                <CardHeader>
                <CardTitle>Premium</CardTitle>
                  <CardDescription>Upgrade to premium premium.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className='flex items-center'><p className='pr-2'>NGN</p><h1 className='text-6xl'>10,000</h1></div>
                  <div className='pt-4'>
                  <h3 className='font-semibold text-xl'>Standard Plan Features</h3>
                  <div className='flex flex-col flex-start'>
                    <li className='text-muted-foreground'>Access to basic articles</li>
                    <li className='text-muted-foreground'>Weekly digest newsletter</li>
                    <li className='text-muted-foreground'>Community forum access</li>
                    <li className='text-muted-foreground'>Limited customer support</li>
                  </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className='w-full'>Subscribe</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default page