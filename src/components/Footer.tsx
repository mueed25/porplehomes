import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import {Separator} from '@/components/ui/separator'
import { Facebook, Instagram, Twitter, LinkedinIcon, LocateIcon, PhoneCallIcon , MessageCircle} from 'lucide-react'

const Footer = () => {
  return (
    <div className='flex flex-col pt-16 '>
        <Separator />
        <div className='py-16 px-8'>
            <MaxWidthWrapper className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div>
                <h1 className='text-[1.5rem] pb-6'>Our trusted partners</h1> 
                <div className='grid grid-cols-2'>
                    
                    <div>
                        <Image src='/logo1.jfif' alt='image log' width={150} height={150} />
                    </div>
                    <div>
                        <Image src='/logo2.png' alt='image log' width={150} height={150} />
                    </div>
                    <div>
                        <Image src='/logo3.png' alt='image log' width={150} height={150} />
                    </div>
                    <div>
                        <Image src='/logo4.jpg' alt='image log' width={150} height={150} />
                    </div>
                </div>
                </div>
                <div className=' max-lg:pt-10'>
                    <h1 className='text-[2rem] pb-6'>Explore our diffrent types of apartment</h1>
                    <p className='text-muted-foreground'>
                    Welcome to porplehomes, where innovation and elegance meet in the world of real estate. Explore our curated collection of stunning properties with a user-friendly interface and smart search options. Immerse yourself in visual excellence through high-resolution images and virtual tours, while integrated maps help you understand the neighborhood. Save favorites, track searches, and stay informed with personalized updates through a secure account. Connect effortlessly with property owners or agents and benefit from real community reviews. Prioritizing your privacy and security, porplehomes offers a seamless and protected property search experience. Start your journey today to find your dream home!
                    </p>
                </div>
            </MaxWidthWrapper>
        </div>
        <div className='pt-8 bg-porple text-muted foreground'>
            <MaxWidthWrapper>
                <div className='px-8 grid lg:grid-cols-2 grid-cols-1 gap-4 py-8'>
                    <div>
                        <h1 className='text-[2rem]  text-white'>Discover</h1>
                        <h2 className='text-white pt-4'>Kano</h2>
                    </div>
                    <div className='max-lg:pt-6'>
                    <h1 className='text-[2rem]  text-white'>Contact Us</h1>
                        <div>
                        <div className='flex pt-4'>
                        <LocateIcon />
                        <p className='text-white px-4'>Behind Police Station Rijiyar Zaki kano State , Nigeria</p>
                        </div>
                        <div className='flex py-4'>
                        <PhoneCallIcon />
                        <p className='text-white px-4'>+2348094672143</p>
                        </div>
                        <div className='flex pb-6'>
                        <MessageCircle />
                        <p className='text-white px-4'>suport@porplehomes.com</p>
                        </div>
                        </div>
                        
                    </div>
                    {/* <div className='grid lg:grid-cols-5 grid-cols-2 gap-4 py-8 '>
                        <h1>Services</h1>
                        <h1>Customer Service</h1>
                        <h1>Locate Us</h1>
                        <h1>Contact Us</h1>
                        <div className='grid grid-cols-4 '>
                            <Facebook />
                            <Instagram />
                            <Twitter />
                            <LinkedinIcon />
                        </div>
                    </div> */}
                    {/* <div className='grid lg:grid-cols-3 grid-cols-2 py-8'>
                        <h1>porplehomes</h1>
                        <h1>@2024 real estate mag.</h1> 
                        <h1>porplehomes@support.com</h1>
                    </div> */}
                </div>
            </MaxWidthWrapper>
        </div>
    </div>
  )
}

export default Footer