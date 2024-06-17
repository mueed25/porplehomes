import { useRef } from 'react';
import { Icon } from '@radix-ui/react-select'
import Link from 'next/link'
import {TentTree, Armchair, ArrowLeft, ArrowRight,ChevronLeft, ChevronRight, Home, ShoppingBag, Sofa, Store, icons , School, Warehouse, Briefcase, UtilityPole, PersonStanding, Speech} from 'lucide-react';
import Image from 'next/image'

const HorizontalScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const Icons = [
    {
      icons: <Store />,
      message: 'Shops'
    },
    {
        icons: <TentTree />,
        message: 'House'
    },
    {
        icons: <Sofa />,
        message: 'Room'
    },
    {
      icons: <Image src='/tree-palm.svg' width={30} height={30} alt='nav icon' />,
        message: 'Land'
    },
    {
      icons: <Image src='/briefcase-business.svg' width={30} height={30} alt='nav icon' />,
      message: 'office'
    },
    {
      icons: <School />,
      message: 'Plaza'
    },
    {
      icons: <Image src='/duplex.png' width={30} height={30} alt='nav icon' />,
        message: 'Duplex'
    },
    {
      icons: <Image src='/bungalow.png' width={30} height={30} alt='nav icon' />,
        message: 'Bungalow'
    },
    {
        icons: <Warehouse />,
        message: 'warehouse'
    },
    {
        icons: <Briefcase />,
        message: 'workshops'
    },
    {
      icons: <UtilityPole />,
        message: 'Power Suppliess'
    },
    {
      icons: <Image src='/brick-wall.svg' width={30} height={30} alt='nav icon' />,
      message: 'Building materials'
    },
    {
      icons: <PersonStanding />,
      message: 'freelancers'
    },
    {
      icons: <Speech />,
        message: 'Agents'
    },
  ]

  return (
    <div className="relative w-full overflow-hidden">
      <button 
        onClick={scrollLeft} 
        className="absolute left-0 z-10 h-8 w-8 flex items-center justify-center rounded-full text-black shadow-md border bg-white bg-opacity-50 hover:bg-opacity-75 transition max-sm:hidden"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
       <ChevronLeft color='black'/>
      </button>
      <div 
        ref={scrollRef} 
        className="flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Add your items here */}
        {Icons.map(icon => {
                    return (
                        <Link
                        href={icon.message}
                        className='flex flex-col max-lg:px-4 lg:px-6  justify-center '>
                            <h2 className='flex justify-center'>{icon.icons}</h2>
                            <p className='text-muted-foreground text-xs font-semibold'>{icon.message}</p>
                        </Link>
                    )
                })}
      </div>
      <button 
        onClick={scrollRight} 
        className="absolute right-0 z-10 h-8 w-8 flex items-center justify-center rounded-full text-black shadow-md border bg-white bg-opacity-50 hover:bg-opacity-75 transition max-sm:hidden"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <ChevronRight color='black'/>
      </button>
    </div>
  );
};

export default HorizontalScroll;
