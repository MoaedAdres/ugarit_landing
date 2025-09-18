import MySwiper from "../Reusable-components/MySwiper"
import MyImage from "../Reusable-components/MyImage"
import { StaticImageData } from "next/image";
interface IHeroSwiperImages {
    images: string[] | StaticImageData[];
}
function HeroSwiperImages({ images }: IHeroSwiperImages) {
    const swiperSlideClasses = "rotate-[5deg] rounded-2xl backdrop-blur-lg backdrop-brightness-150 w-full h-full"
    return (
        <MySwiper
            swiperClasses=""
            needAutoPlay
            needEffectCards
            parentClasses=" w-[300px] mt-10 h-[320px]"
            wrapperClasses=""
            swiperSlideClasses={swiperSlideClasses}
            autoplay={{ disableOnInteraction: false, delay: 1000 }}
            showNextButton={false} showPreviousButton={false} showPagination={false} effect="cards" grabCursor={true} slidesPerView="auto" speed={1000}>
            {images?.map((image, index) => <MyImage key={index} className="w-full h-full" src={image} alt={`hero image ${index + 1}`} />)}
        </MySwiper>
    )
}

export default HeroSwiperImages