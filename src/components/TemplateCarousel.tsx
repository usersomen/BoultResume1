import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

const templates = [
  {
    id: 1,
    name: 'Professional',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400'
  },
  {
    id: 2,
    name: 'Modern',
    image: 'https://images.unsplash.com/photo-1626197031507-c17099753214?w=400'
  },
  {
    id: 3,
    name: 'Creative',
    image: 'https://images.unsplash.com/photo-1626197031507-c17099753214?w=400'
  },
  {
    id: 4,
    name: 'Simple',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400'
  }
];

export default function TemplateCarousel() {
  const swiperRef = useRef<SwiperType>();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates
            to kickstart your career journey
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="py-8"
          >
            {templates.map((template) => (
              <SwiperSlide key={template.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <button className="mt-2 text-purple-600 font-medium hover:text-purple-700">
                      Use this template
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}