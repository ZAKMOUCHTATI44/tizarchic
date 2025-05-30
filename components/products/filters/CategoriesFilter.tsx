"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import Loading from "@/components/ui/Loading";
import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorUi from "@/components/ui/ErrorUi";

const CategoriesFilter = () => {
  async function fetchData() {
    const res = await axiosInstance.get("/product-categories");
    return res.data;
  }
  const { data, isLoading, error } = useQuery<ProductCategoriesResponse>({
    queryKey: ["/product-categories"],
    queryFn: fetchData,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let items: string[] = categoriesFilter;
    const item = items.find((item) => item === e.target.value);
    if (item) {
      items = categoriesFilter.filter((item) => item !== e.target.value);
    } else {
      items = [...categoriesFilter, e.target.value];
    }
    setCategoriesFilter(items);

    router.replace(
      `${pathname}?${createQueryString("categories", items.join(","))}`,
      { scroll: false }
    );
  };
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value.length > 0) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  if (error) return <ErrorUi/>;


  return (
    <div className="border-b border-gray-400 py-5">
      <div className="flex items-center justify-between">
        <h5 className="text-2xl">Catégorie</h5>
        <p>{categoriesFilter.length} Sélectionné</p>
      </div>
      <div>{isLoading && <Loading />}</div>
      <div className="mt-5 lg:block flex justify-around">
        {data && data.product_categories.map((category) => (
          <div
            className="flex items-center lg:justify-start justify-around mb-2"
            key={category.id}
          >
            <input
              id={category.id}
              value={category.id}
              checked={
                categoriesFilter.includes(category.id.toString()) ? true : false
              }
              type="checkbox"
              className="w-4 h-4 focus:ring-0 focus:shadow-none accent-main checked:text-white lg:block hidden"
              onChange={handleChange}
            />
            <label
              htmlFor={category.id}
              className=" ml-2 text-sm font-medium lg:block hidden"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
