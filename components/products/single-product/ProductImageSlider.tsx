"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';

export function ProductImageSlider({ productImages }: { productImages: string[] | undefined }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', dragFree: true, breakpoints: { '(max-width: 768px)': { axis: 'x' } } });

  const handleThumbnailClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", handleSelect);
    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <div className="mx-auto pb-8 flex flex-col md:grid md:grid-cols-5 gap-4">
      {/* Thumbnail Gallery - Vertical on desktop, horizontal on mobile */}
      <div className="flex md:flex-col items-center gap-4 overflow-auto px-2 py-4 max-h-[600px] md:max-h-[600px] md:overflow-y-auto md:overflow-x-hidden">
        {productImages?.map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative h-16 w-16 md:h-20 md:w-20 cursor-pointer rounded-lg border-2 transition-all shrink-0 ${
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

      {/* Main Carousel */}
      <div className="relative overflow-hidden md:col-span-4 h-[300px] md:h-[600px]" ref={emblaRef}>
        <div className="flex md:flex-col h-full w-full">
          {productImages?.map((image, index) => (
            <div key={index} className="min-w-full md:min-h-0 md:flex-[0_0_100%]">
              <div className="relative h-[300px] md:h-full rounded-lg group">
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  fill
                  className="object-contain rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
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
