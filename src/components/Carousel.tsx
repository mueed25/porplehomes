'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { trpc } from '@/trpc/client';
import { Advert} from '@/payload-types';
import Image from 'next/image';

const images = [
  'https://via.placeholder.com/800x400?text=Image+1',
  'https://via.placeholder.com/800x400?text=Image+2',
  'https://via.placeholder.com/800x400?text=Image+3',
  'https://via.placeholder.com/800x400?text=Image+4',
  'https://via.placeholder.com/800x400?text=Image+5',
  
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: queryResults, isLoading} = trpc.getAdverts.useInfiniteQuery({
    
  })

//   const properties = queryResults?.pages.flatMap

  const properties = queryResults?.pages.flatMap(
    (page) => page.items
  )

  let map: (Advert | null)[] = []
  if (properties && properties.length) {
    map = properties
  } else if (isLoading) {
    map = new Array<null>(
    ).fill(null)
  }

  const ValidUrls = map.map( (advert, i ) => {
    return advert?.images 
    .map(({ images }) =>
      typeof images === 'string' ? images : images.url
    )
    .filter(Boolean) as string[]
  }).flat()

//   console.log(ValidUrls)
//   const { data: queryResults, isLoading } =
//   trpc.getInfiniteProducts.useInfiniteQuery(
//     {
//       limit: query.limit ?? FALLBACK_LIMIT,
//       query,
//     },
//     {
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//     }
//   )

//   console.log(queryResults)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const visibleImages = ValidUrls.concat(ValidUrls.slice(0, 4));; // to loop seamlessly

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }} // Adjusted for 3 images in view
      >
        {visibleImages.map((src, index) => (
          <div
            key={index}
            className={classNames(
              'flex-shrink-0 w-1/4 h-64 flex justify-center items-center transition-transform duration-700 ease-in-out', // Adjusted width and height
              {
                'scale-110': index === (currentIndex + 1) % ValidUrls.length,
                'scale-90': index !== (currentIndex + 1) % ValidUrls.length,
              }
            )}
          >
            {/* {srcs.map( src => ( */}
                <Image
                fill
                src={src}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full rounded-lg" // Added rounded corners
              />
            {/* ))} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
