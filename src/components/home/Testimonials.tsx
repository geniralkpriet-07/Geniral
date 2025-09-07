// src/components/home/Testimonials.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This department has completely changed the way I think about technology. The faculty and peers are inspiring!",
    name: "Arjun Kumar",
    role: "2nd Year CSE",
    rating: 5,
  },
  {
    quote:
      "Joining the coding club was the best decision. I’ve learned more here than in years of self-study!",
    name: "Priya Sharma",
    role: "3rd Year IT",
    rating: 4,
  },
  {
    quote:
      "The mentorship and guidance I’ve received helped me land my first internship. Truly grateful!",
    name: "Rahul Verma",
    role: "Final Year AI&DS",
    rating: 5,
  },
  {
    quote:
      "Joining the coding club was the best decision. I’ve learned more here than in years of self-study!",
    name: "ramesh",
    role: "3rd Year IT",
    rating: 4,
  },
  {
    quote:
      "The mentorship and guidance I’ve received helped me land my first internship. Truly grateful!",
    name: "vishal",
    role: "Final Year AI&DS",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const totalSlides = testimonials.length;
  const desktopSlidesPerView = Math.min(2, totalSlides);
  const desktopSlidesPerGroup = desktopSlidesPerView;

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Student{" "}
          <span className="bg-gradient-to-r from-[#a8b5fb] to-[#b1caf8] bg-clip-text text-transparent">
            Voices
          </span>
        </h2>

        <Swiper
          modules={[Autoplay,Navigation]}
          loop={totalSlides > desktopSlidesPerView}
          // loopFillGroupWithBlank={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          // pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          spaceBetween={30}
          slidesPerView={1}
          slidesPerGroup={1}
          breakpoints={{
            768: {
              slidesPerView: desktopSlidesPerView,
              slidesPerGroup: desktopSlidesPerGroup,
            },
          }}
          observer={true}
          observeParents={true}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-[rgba(20,20,50,0.5)] rounded-lg p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[rgba(128,128,255,0.1)] h-full flex flex-col justify-between"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Quote */}
                <div className="italic text-white/90 leading-7 mb-6 relative min-h-[4.5rem]">
                  <Quote className="absolute -top-3 -left-3 text-[#b1caf8] opacity-70 w-6 h-6" />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.15 }}
                    className="text-sm sm:text-base"
                  >
                    {t.quote}
                  </motion.p>
                </div>

                {/* rating + user */}
                <div>
                  <div className="flex mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg leading-none">
                        ⭐
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#a8b5fb]/30 flex items-center justify-center text-white font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-white/70">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Custom arrows */}
          <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-black/40 text-white p-2 rounded-full hover:bg-black/70">
            ◀
          </div>
          <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-20 cursor-pointer bg-black/40 text-white p-2 rounded-full hover:bg-black/70">
            ▶
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

