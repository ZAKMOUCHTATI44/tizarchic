"use client";
import React, { useState, useEffect } from "react";
import CardProductShopCart from "../utils/CardProductShopCart";
import CodePromo from "./CodePromo";
import Cookies from "js-cookie";
import { useCart } from "@/lib/cart";
import Loading from "../ui/Loading";
import ErrorUi from "../ui/ErrorUi";

const OrderInfo = () => {
  const [cartId, setCartId] = useState<string | null>(null);
  useEffect(() => {
    const cartIdFromCookie = Cookies.get("CART_ID");
    setCartId(cartIdFromCookie || null);
  }, []);

  const { data: cart, isLoading, error } = useCart(cartId || "");

  if (!cartId) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <ErrorUi />;

 

  return (
    <div className=" col-span-2 sticky top-32 h-[700px]">
      <div className="border p-5 flex flex-col gap-5 py-12 rounded-md">
        <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">Résumé de votre commande</h2>
        {cart?.items?.map((item) => (
          <CardProductShopCart
            key={item.id}
            lineId={item.id}
            productId={item.product.id}
            quantity={item.quantity}
          />
        ))}
        <CodePromo />
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex justify-between">
            <p>Sous-total</p>
            <p>{cart?.subtotal || 0} MAD</p>
          </div>
          <div className="flex justify-between">
            <p>Livraison</p>
            <p>Gratuit</p>
          </div>
          {cart?.promotions && cart?.discount_total !== 0 && (
            <div className="flex justify-between">
              <p>Code Promo</p>
              <p className="font-semibold">{cart?.discount_total} MAD </p>
            </div>
          )}
          <div className="flex justify-between">
            <p>Total</p>
            <p className="font-semibold">{cart?.item_total || 0} MAD </p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default OrderInfo;
