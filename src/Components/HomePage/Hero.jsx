import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import RightArrowImg from "../../../public/Icons/arrow-right.png";
import LeftArrowImg from "../../../public/Icons/left-arrow.png";
import CircleImg from "../../../public/Icons/circle.png";
import BannerImg from "../../../public/Images/Banner/banner.webp";

function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedSnaps, setSelectedSnaps] = useState("");
  const scrollTo = (index) => emblaApi?.scrollTo(index);
  const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList());

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedSnaps(emblaApi.selectedScrollSnap());
    };
    onSelect();
    setupSnaps(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", setupSnaps);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", setupSnaps);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const goPev = () => emblaApi?.scrollPrev();
  const goNext = () => emblaApi?.scrollNext();
  const slides = [1, 2, 3, 4, 5];

  return (
    <section id="hero-section">
        <div className="w-full h-80 md:h-100 relative">
        <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
            {slides.map((item) => (
                <div className="flex-[0_0_100%] h-full w-full min-w-0" key={item}>
                <img
                    src={BannerImg}
                    alt="banner image"
                    className="h-full w-full object-cover"
                />
                </div>
            ))}
            </div>
        </div>
        <button
            onClick={goPev}
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
            <img
            src={LeftArrowImg}
            alt="left arrow icon"
            className="h-7 w-7 object-contain invert"
            />
        </button>
        <button
            onClick={goNext}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-10"
        >
            <img
            src={RightArrowImg}
            alt="right arrow icon"
            className="h-7 w-7 object-contain invert"
            />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-4">
            {scrollSnaps.map((_, index) => (
            <button
                key={index}
                onClick={() => scrollTo(index)}
                className="cursor-pointer"
            >
                <img
                src={CircleImg}
                alt="circle icon"
                className={`h-3 w-3 object-contain ${selectedSnaps === index ? "opacity-100" : "opacity-50"}`}
                />
            </button>
            ))}
        </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-0 md:gap-6">
            <div className="h-50  w-full bg-[url(/Images/Banner/banner3.webp)] bg-center bg-cover bg-no-repeat cursor-pointer">
                <div className="w-56 py-6 px-6 h-full flex flex-col justify-center gap-3">
                    <h2 className="font-semibold text-2xl tracking-wide">Relaxed Fit Overshirt</h2>
                    <div className="bg-white h-fit w-36 px-4 py-2 flex items-center justify-center">
                        <p className="font-semibold tracking-wide">Discount 20%</p>
                    </div>
                </div>
            </div>
            <div className="h-50  w-full bg-[url(/Images/Banner/banner2.webp)] bg-center bg-cover bg-no-repeat cursor-pointer">
                <div className="w-56 py-6 px-6 h-full flex flex-col justify-center gap-3">
                    <h2 className="font-semibold text-2xl tracking-wide">Discount 20% All Items</h2>
                    <div className="bg-white h-fit w-36 px-4 py-2 flex items-center justify-center">
                        <p className="font-semibold tracking-wide">100% Leather Handmade</p>
                    </div>
                </div>
            </div>
            <div className="h-50  w-full bg-[url(/Images/Banner/banner1.webp)] bg-center bg-cover bg-no-repeat cursor-pointer">
                <div className="w-56 py-6 px-6 h-full flex flex-col justify-center gap-3">
                    <h2 className="font-semibold text-2xl tracking-wide">Get 20% off in App</h2>
                    <div className="bg-white h-fit w-40 py-2 px-4 flex items-center justify-center">
                        <p className="font-semibold tracking-wide">Download Now</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Hero;
