
// import { getPayloadClient } from '@/getPayloadClient'

const UpCarousel = async () => {

    // const payload = await getPayloadClient()

    // const {docs : adverts} = await payload.find({
    //     collection: 'advertisement',
    //     depth: 2
    //   })

    //   console.log(adverts)

    //   const ImageUrls = advert.images
    //   .map(({ images }) =>
    //     typeof images === 'string' ? images : images.url
    //   )
    //   .filter(Boolean) as string[]
    //   const ImageUrls = advert.images
    //   .map(({ images }) =>
    //     typeof image === 'string' ? image : image.url
    //   )
    //   .filter(Boolean) as string[]
  return (
    <div>
        {/* <Carousel images={ImageUrls}/> */}
        <h1>All the images of carousel</h1>
    </div>
  )
}

export default UpCarousel