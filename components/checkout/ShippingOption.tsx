/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axiosInstance from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useCallback } from "react";
import Loading from "../ui/Loading";
import ErrorUi from "../ui/ErrorUi";
import Cookies from "js-cookie";

interface ShippingOption {
  id: string;
  name: string;
  amount: number;
  data?: {
    estimated_days?: number;
  };
}

const ShippingOption = () => {
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState<string | null>(null);
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");

  useEffect(() => {
    setCartId(Cookies.get("CART_ID") || null);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["shipping-options", cartId],
    queryFn: async () => {
      const res = await axiosInstance.get<{
        shipping_options: ShippingOption[];
      }>(`/shipping-options?cart_id=${cartId}`);
      return res.data;
    },
    enabled: !!cartId,
  });

  const handleSelectShipping = useCallback(
    async (optionId: string) => {
      setSelectedShippingId(optionId);
      try {
        await axiosInstance.post(`/carts/${cartId}/shipping-methods`, {
          option_id: optionId,
        });
        queryClient.invalidateQueries({
          queryKey: ["cart", cartId],
        });
      } catch (error) {
        console.error("Failed to set shipping method:", error);
      }
    },
    [cartId, queryClient]
  );

  // Set first shipping option as default
  useEffect(() => {
    if (data?.shipping_options?.length && !selectedShippingId) {
      const firstOptionId = data.shipping_options[0].id;
      setSelectedShippingId(firstOptionId);
      handleSelectShipping(firstOptionId);
    }
  }, [data?.shipping_options, handleSelectShipping, selectedShippingId]);

  if (!cartId) return <Loading />;
  if (isLoading) return <Loading />;
  if (error) return <ErrorUi />;

  return (
    <div className="border p-5 rounded-md">
      <h2 
        className="text-2xl font-serif font-medium text-gray-900 mb-4"
      >Mode de livraison</h2>
      <div className="space-y-4">
        {data?.shipping_options?.map((option: ShippingOption) => (
          <label
            key={option.id}
            className={`block border p-4 rounded-md transition-colors cursor-pointer ${
              selectedShippingId === option.id
                ? "border-main bg-main/10"
                : "hover:border-main/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  checked={selectedShippingId === option.id}
                  onChange={() => handleSelectShipping(option.id)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedShippingId === option.id
                      ? "border-main bg-main"
                      : "border-gray-400"
                  }`}
                >
                  {selectedShippingId === option.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm">{option.name}</p>
              </div>
              <div className="font-medium">
                {option.amount ? `${option.amount / 100} €` : "Gratuit"}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingOption;