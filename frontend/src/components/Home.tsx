import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ScrollAnimation from "react-animate-on-scroll";
import { motion } from "framer-motion";
import Header from "./Header";
import Features from "./Features";
import How_It_Works from "./How_It_Works";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,

    image: "/img/img05.jpg",
  },
  {
    id: 2,

    image: "/img/img08.jpg",
  },

  {
    id: 3,

    image: "/img/img03.jpg",
  },

  {
    id: 4,

    image: "/img/img07.jpg",
  },
];

function Home() {
  return (
    <div>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1.5 }}
        transition={{ duration: 1 }}
      >
        <section id="home">
          <div className="relative w-full h-[60vh] md:h-[70vh] ">
            <Swiper
              modules={[Autoplay, Navigation, Pagination, Parallax]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop
              slidesPerView={1}
              spaceBetween={0}
              speed={2000}
              className="w-full h-full"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id} className="relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center "
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="bg-[rgba(4,9,30,0.7)] absolute inset-0 "></div>{" "}
                    {/* //color gradient */}
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                    <h1 className="text-2xl  tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]   ">
                      Turn Your WhatsApp Status Into Income.
                    </h1>
                    <p className="mt-10 px-4 text-muted-foreground text-slate-300 sm:text-xl">
                      Connect brands with your engaged WhatsApp audience. Share
                      what you love, earn what you deserve.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 min-[400px]:flex-row justify-center items-center">
                      <Link to="/bsignup">
                        {" "}
                        <Button
                          size="lg"
                          className="bg-green-600 hover:bg-green-700 cursor-pointer"
                        >
                          I'm a Brand
                        </Button>
                      </Link>
                      <Link to="/isignup">
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-zinc-500 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                          I'm an Influencer
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
        <section id="features">
          <Features />
        </section>
      </motion.div>
      <section>
        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
          <How_It_Works />
        </ScrollAnimation>
      </section>
      <section>
        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
          <Testimonials />
        </ScrollAnimation>
      </section>
      <section>
        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
          <CTA />
        </ScrollAnimation>
      </section>
      <Footer />
    </div>
  );
}
export default Home;
// className="container mx-auto px-4 py-2 justify-center flex flex-col text-center items-center min-h-screen"
