"use client"
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';

export function ProductImageSlider({productImages} : {productImages : string[] | undefined }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y' });

  const handleThumbnailClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return undefined; 
    }
    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div className="max-w-4xl mx-auto pb-8 grid grid-cols-5 gap-4">
      {/* Vertical Thumbnail Gallery */}
      <div className="flex flex-col items-center gap-4 overflow-y-auto px-2 py-4 max-h-[600px]">
        {productImages?.map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative h-20 w-20 cursor-pointer rounded-lg border-2 transition-all ${
              selectedIndex === index 
                ? "border-main scale-105" 
                : "border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Vertical Main Carousel */}
      <div className="relative overflow-hidden col-span-4 h-[600px]" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {productImages?.map((image, index) => (
            <div key={index} className="min-h-0 flex-[0_0_100%]">
              <div className="relative h-full rounded-lg group">
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  width={700}
                  height={700}
                  className="object-cover w-full rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}