import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "./Header";
import About from "./about";
const slides = [
  {
    id: 1,

    image: "/img/img01.jpg",
  },
  {
    id: 1,

    image: "/img/img02.jpg",
  },
  {
    id: 1,

    image: "/img/img03.jpg",
  },
];

function Home() {
  return (
    <div>
      <Header />
      <section id="home">
        <div className="relative w-full h-[60vh]">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Parallax]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            slidesPerView={1}
            spaceBetween={0}
            speed={1500}
            className="w-full h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>{" "}
                  {/* //color gradient */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
            <h1 className="text-2xl  tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]   ">
              Turn Your WhatsApp Status Into Income.
            </h1>
            <p className=" mt-5 text-muted-foreground text-slate-300 sm:text-xl mx-auto">
              Connect brands with your engaged WhatsApp audience. Share what you
              love, earn what you deserve.
            </p>
            <div className="mt-5 flex flex-col gap-3 min-[400px]:flex-row justify-center items-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                I'm a Brand
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-zinc-500 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                I'm an Influencer
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <About />
      </section>
    </div>
  );
}
export default Home;
// className="container mx-auto px-4 py-2 justify-center flex flex-col text-center items-center min-h-screen"
