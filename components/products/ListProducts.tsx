"use client";
import React from "react";
import PaginationProducts from "./PaginationProducts";
import Loading from "../ui/Loading";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import ErrorUi from "../ui/ErrorUi";
import axiosInstance from "@/lib/api";

const ListProducts = () => {
  const searchParams = useSearchParams();
  const categories = searchParams.get("categories")?.split(",") || [];
  const types = searchParams.get("types")?.split(",") || [];
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const limit = 12;

  const orderby = searchParams.get("orderby") || "";

  const buildQueryString = () => {
    let queryParams = `/products?fields=*variants.calculated_price`;

    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        queryParams += `&category_id=${category}`;
      });
    }

    if (types && types.length > 0) {
      types.forEach((type) => {
        queryParams += `&type_id=${type}`;
      });
    }

    if (orderby) {
      queryParams += `&order=${orderby}`;
    }

    return queryParams;
  };
  async function fetchData() {
    const res = await axiosInstance.get(buildQueryString());
    return res.data;
  }
  const { data, isLoading, error } = useQuery<ProductPagination>({
    queryKey: [buildQueryString()],
    queryFn: fetchData,
  });

  if (error) return <ErrorUi />;

  const totalPages = data ? Math.ceil(data.count / limit) : 0;


  return (
    <>
      <div>{isLoading && <Loading />}</div>

      <div className="grid grid-cols-3 gap-5">
        {!data ||
          (data.count === 0 && (
            <div className="col-span-3 flex justify-center py-12 px-5">
              <Image
                src={"/empty.svg"}
                alt="Empty"
                width={1080}
                height={1080}
              />
            </div>
          ))}
        {data && data.products.length > 0 && (
          <>
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div className="col-span-3 my-5">
              <PaginationProducts
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListProducts;
