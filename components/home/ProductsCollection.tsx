"use client";
import React from "react";
import ErrorUi from "@/components/ui/ErrorUi";
import Loading from "@/components/ui/Loading";
import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductsList from "@/components/home/ProductsList";

const ProductsCollection = () => {
  const buildQueryString = `/product-types`;
  async function fetchData() {
    const res = await axiosInstance.get(buildQueryString);
    return res.data;
  }
  const { data, isLoading, error } = useQuery<TypePagination>({
    queryKey: [buildQueryString],
    queryFn: fetchData,
  });

  if (error) return <ErrorUi />;

  return (
    <div>
      {isLoading && <Loading />}
      {data?.product_types.map((type) => (
        <ProductsList
          typeId={type.id}
          key={type.id}
          title={`Notre sélection de ${type.value}`}
          description={`Découvrez notre sélection exclusive de ${type.value} pour sublimer votre style avec élégance et raffinement.`}
        />
      ))}
    </div>
  );
};

export default ProductsCollection;
