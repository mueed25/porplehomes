import Image from 'next/image'
import HomeNav from '@/components/HomeNav'
import HomeComp from '@/components/HomeComp'

export default function Home() {

  return (
    <>
    <div>
      <section className=' -z-10 absolute w-full  '>
          <div className=" h-screen w-full relative">
          <div className=" h-full w-full bg-blac "></div>
          <Image
            alt='main image'
            className='object-cover h-full w-full -z-10 opac' 
            src='/homepage.png' 
            fill />
          </div>
      </section>
     
     <section className='w-full'>
      <HomeNav />
      <HomeComp />
     </section>
   
        </div>
    </>
  )
}


