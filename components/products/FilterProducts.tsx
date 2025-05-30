import React from "react";
import TypeProducts from "./filters/TypeProducts";
import CategoriesFilter from "./filters/CategoriesFilter";
import { Button } from "../ui/button";
import { Filter, RotateCcw } from "lucide-react";
import Link from "next/link";

const FilterProducts = () => {
  return (
    <div className="pb-12 flex flex-col gap-5">
      <CategoriesFilter />
      <TypeProducts />
      {/* <Price /> */}
      <div className="flex gap-1">
        <Button className="bg-main width-fill-available hover:bg-transparent hover:text-main border border-main">
          <Filter className="w-5 h-5" />
          Products
        </Button>
        <Button
          asChild
          className="bg-transparent text-main border border-main hover:bg-main hover:text-white"
        >
          <Link href={"/products"}>
            <RotateCcw className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FilterProducts;
