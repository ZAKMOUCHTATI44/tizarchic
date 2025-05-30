"use client";
import React from "react";
import { Card } from "../ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="group bg-white h-full rounded-none shadow-none transition-all duration-300 ease-in-out overflow-hidden border-0">
    <div className="relative aspect-[4/5] overflow-hidden">
    <Link href={`/products/${product.handle}`}>
      <Image
        src={product.thumbnail ?? ""}
        alt={product.title ?? ""}
        width={250}
        height={250}
        className="object-cover w-full transition-transform duration-300 group-hover:scale-105 "
      />
      
      {/* Nouveauté Badge */}
      <div className="absolute top-4 right-4 bg-main text-white px-4 py-2 text-xs font-medium uppercase tracking-widest rounded-md">
        Nouveauté
      </div>
    </Link>
    </div>

    <Link
      href={`/products/${product.handle}`}
      className="flex flex-col justify-between p-6"
    >
      <div className="space-y-3">
        <h2 className="text-2xl font-serif font-light text-gray-900">
          {product.title}
        </h2>
        
        <p className="text-sm text-gray-600 font-light leading-relaxed">
        {product.description.substring(0,100)} ...
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xl font-serif font-medium text-gray-900">
        {product.variants[0].calculated_price.calculated_amount} MAD
        </p>
        <button className="flex hover:underline items-center gap-2 text-sm font-medium text-gray-900 hover:text-black transition-colors">
          Voir le produit
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </Link>
  </Card>
);

export default ProductCard;