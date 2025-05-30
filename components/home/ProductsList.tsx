"use client";
import React from "react";
import ProductCard from "../products/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorUi from "../ui/ErrorUi";
import Loading from "../ui/Loading";

const ProductsList = ({
  title,
  description,
  typeId,
}: {
  title: string;
  description: string;
  typeId: string;
}) => {
  const buildQueryString = `/products?fields=*variants.calculated_price&type_id=${typeId}`;

  async function fetchData() {
    const res = await axiosInstance.get(buildQueryString);
    return res.data;
  }
  const { data, isLoading, error } = useQuery<ProductPagination>({
    queryKey: [buildQueryString],
    queryFn: fetchData,
  });

  if (error) return <ErrorUi />;

  return (
    <div className="my-24 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col gap-2 text-center items-center">
        <p className="text-xl text-gray-800 font-serif capitalize  leading-relaxed">
          {description}
        </p>
        <h2 className="text-4xl  text-main uppercase font-serif font-light ">
          {title}
        </h2>
      </div>
      {isLoading && <Loading />}
      <div className="my-12">
        <Swiper
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2 }, // Small tablets
            1024: { slidesPerView: 2 }, // Large tablets
            1280: { slidesPerView: 3 }, // Desktops
          }}
          className="w-full"
        >
          {data &&
            data.products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* {isLoading && <Loading />}
      
      */}
    </div>
  );
};

export default ProductsList;
