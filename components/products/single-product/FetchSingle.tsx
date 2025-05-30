"use client"
import React from "react";
import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorUi from "@/components/ui/ErrorUi";
import RelatedProducts from "@/components/products/RelatedProducts";
import { ProductImageSlider } from "@/components/products/single-product/ProductImageSlider";
import Loading from "@/components/ui/Loading";
import ShowProduct from "@/components/products/single-product/ShowProduct";


const FetchSingle = ({ slug }: { slug: string }) => {
  const buildQueryString = `/products?fields=*variants.calculated_price&handle=${slug}`;

  async function fetchData() {
    const res = await axiosInstance.get(buildQueryString);
    return res.data;
  }
  const { data, isLoading, error } = useQuery<ProductPagination>({
    queryKey: [buildQueryString],
    queryFn: fetchData,
    enabled: !!slug,
  });

  if (error) return <ErrorUi />;

  return (
    <div>
      {isLoading && <Loading />}

      {data && data.products[0] && (
        <div className="min-h-screen grid grid-cols-2">
          <div>
            <ProductImageSlider
              productImages={data.products[0].images?.map((image) => image.url)}
            />
          </div>
          <ShowProduct product={data.products[0]} />
        </div>
      )}

      <RelatedProducts />
    </div>
  );
};

export default FetchSingle;
