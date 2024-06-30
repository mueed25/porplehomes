'use client'
import { Property } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

interface ImageSliderProps {
    urls: string[]
  }

const Agentholder = ({ urls }: ImageSliderProps) => {
  return (
    <div className='w-full h-full '>
        {urls.map( (url, index) => {
            return (
              <div key={index}>
                <Image 
                src={url} 
                height={200}
                width={200}
                alt='Agent image' 
                className="shadow-lg rounded-full " />
                </div>
            )
        })}
        
    </div>
  )
}

export default Agentholder