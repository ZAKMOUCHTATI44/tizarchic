"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";
import Loading from "../ui/Loading";
import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorUi from "../ui/ErrorUi";

const RelatedProducts = () => {
  const buildQueryString = `/products?fields=*variants.calculated_price`;
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
    <div className="flex flex-col gap-5 my-12">
      <div className="flex flex-col gap-2 text-center items-center">
        {/* <h2 className="text-5xl font-bold text-main">Produits Similaires</h2> */}
        <p className="text-gray-800 font-semibold text-5xl text-main">
          Vous pouvez aimer ...
        </p>
      </div>

      {isLoading && <Loading />}
      <div className="container mx-auto my-5">
        <Swiper
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {data &&
            data.products.map((product, index) => (
              <SwiperSlide key={index} className="pb-5"> {/* Fixed height */}
                <div className="h-full">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;