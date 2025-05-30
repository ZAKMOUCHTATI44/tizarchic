"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/api";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";

const CodePromo = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const cartId = Cookies.get("CART_ID");

  const queryClient = useQueryClient();

  const validationCodePromo = async () => {
    try {
      const res = await axiosInstance.post(`/carts/${cartId}/promotions`, {
        promo_codes: [inputValue],
      });
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Code de réduction"
      />
      <Button
        onClick={validationCodePromo}
        className="border border-main bg-transparent text-main hover:bg-main hover:text-white"
      >
        Valider
      </Button>
    </div>
  );
};

export default CodePromo;
