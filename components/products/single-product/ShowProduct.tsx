"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAddItemToCart } from "@/lib/cart";
import useStore from "@/lib/store";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import Cookies from "js-cookie";

const ShowProduct = ({ product }: { product: Product }) => {
  // const [size, setSize] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [variantProduct, setVariantProduct] = useState<Variant | undefined>();
  const addItemToCart = useAddItemToCart();
  const { setOpen } = useStore();
  const cartId = Cookies.get("CART_ID");

  const handleClick = async () => {
    if (cartId !== undefined && variantProduct)
      await addItemToCart({
        cartId,
        variantId: variantProduct.id,
        quantity,
      });
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-serif font-medium text-gray-900 mb-4">
          {product.title}
        </h1>
        <p className="text-3xl font-serif text-main font-bold">
          {product.variants[0].calculated_price.calculated_amount}
          <span className="text-base font-medium ml-1">MAD</span>
        </p>
      </div>

      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-3">
          Quantity
        </Label>
        <div className="flex items-center border border-gray-200 rounded w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 border-r border-gray-200 hover:bg-gray-50"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="px-6 py-2 text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2 border-l border-gray-200 hover:bg-gray-50"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        {product.variants.length > 0 && (
          <>
            <Label className="text-base capitalize">Taille</Label>

            <div className="flex gap-2 items-center">
              {product.variants.map((item) => (
                <Button
                  onClick={() => {
                    // setProductOption(value.id);
                    setVariantProduct(item);
                  }}
                  variant={
                    variantProduct?.id === item.id ? "default" : "outline"
                  }
                  className={
                    variantProduct?.id === item.id
                      ? "bg-main border border-main hover:bg-transparent hover:text-main"
                      : "bg-transparent border border-gray-600"
                  }
                  key={item.id}
                >
                  {item.title}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>

      <Button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-main hover:bg-main px-6 py-3 rounded-lg shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md group-hover:opacity-100 opacity-100"
      >
        <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
        Ajouter au panier
      </Button>

      <p className="text-gray-600 font-serif leading-relaxed">
        {product.description}
      </p>
    </div>
  );
};

export default ShowProduct;
