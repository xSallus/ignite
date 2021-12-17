import { Flex } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';

import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/lazy"
import "swiper/css/controller"

import { useBreakpoints } from '../../styles/breakpoints'
import { ContinentLink } from './Link'
import { SwiperProps } from '../../@types'

SwiperCore.use([Pagination, Navigation]);
function ContinentsSwiper({ continents }: SwiperProps) {
  const { swiperContainerBreakpoint } = useBreakpoints();
  return (
    <Flex w={1240} maxW="100vw" h={swiperContainerBreakpoint} align="center" justify="center" justifySelf="center" mb="4">
      <Swiper
        spaceBetween={25}
        slidesPerView={1}
        pagination={true}
        navigation={true}
        className="swiper"
        loop={true}
      >
        {continents.map(continent => (
          <SwiperSlide key={continent.id}>
            <ContinentLink continent={continent} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}

export { ContinentsSwiper as Swiper }
