"use client"
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ValiderOrder = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const cartIdFromCookie = Cookies.get("CART_ID");
    setCartId(cartIdFromCookie || null);
  }, []);

  const completeCart = async () => {
    try {
      await axiosInstance.post(`/carts/${cartId}/complete`);
      router.push("/thankyou");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={completeCart}
        type="submit"
        className="w-full capitalize bg-main text-white hover:bg-main-color hover:opacity-75 transition-all ease-in-out duration-200"
      >
        Valider ma commande
      </Button>
    </div>
  );
};

export default ValiderOrder;
