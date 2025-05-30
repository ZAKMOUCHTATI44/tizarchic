/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useCart } from "@/lib/cart";
import Loading from "../ui/Loading";
import ErrorUi from "../ui/ErrorUi";
import axiosInstance from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface PaymentSession {
  provider_id: string;
}

interface PaymentCollection {
  id: string;
  payment_sessions?: PaymentSession[];
}

interface Cart {
  id: string;
  region_id: string;
  payment_collection?: PaymentCollection;
}

interface PaymentMethod {
  payment_providers: {
    id: string;
    is_enabled: boolean;
  }[];
}

const PaymentMethod = () => {
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState<string | null>(null);
  const [selectPaymentId, setSelectPaymentId] = useState<string>("");

  const {
    data: cart,
    isLoading: isLoadingCart,
    error: errorCart,
  } = useCart(cartId || "") as { data: Cart; isLoading: boolean; error: any };

  const { data, isLoading, error } = useQuery<PaymentMethod>({
    queryKey: ["payment-providers", cart?.region_id],
    queryFn: async ({ queryKey }) => {
      const [, region_id] = queryKey;
      const res = await axiosInstance.get(
        `/payment-providers?region_id=${region_id}`
      );
      return res.data;
    },
    enabled: !!cart?.region_id,
  });

  useEffect(() => {
    const cartIdFromCookie = Cookies.get("CART_ID");
    setCartId(cartIdFromCookie || null);
  }, []);

  const handlePaymentProviderSelect = useCallback(
    async (providerId: string) => {
      try {
        let paymentCollectionId = cart?.payment_collection?.id;

        if (!paymentCollectionId) {
          const { data } = await axiosInstance.post<{
            payment_collection: PaymentCollection;
          }>(`/payment-collections`, { cart_id: cart?.id });
          paymentCollectionId = data.payment_collection.id;
        }

        await axiosInstance.post(
          `/payment-collections/${paymentCollectionId}/payment-sessions`,
          { provider_id: providerId }
        );

        queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
        setSelectPaymentId(providerId);
      } catch (error) {
        console.error("Error selecting payment provider:", error);
      }
    },
    [cart, cartId, queryClient]
  );

  // Auto-select first payment provider
  useEffect(() => {
    if (data?.payment_providers?.length && !selectPaymentId) {
      const firstEnabledProvider = data.payment_providers.find(
        (p) => p.is_enabled
      );
      if (firstEnabledProvider) {
        handlePaymentProviderSelect(firstEnabledProvider.id);
      }
    }
  }, [data?.payment_providers, handlePaymentProviderSelect, selectPaymentId]);

  if (!cartId) return <Loading />;
  if (isLoading || isLoadingCart) return <Loading />;
  if (error || errorCart) return <ErrorUi />;

  return (
    <div className="border p-5 rounded-md hidden">
      <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">
        Payment Method
      </h2>
      <div className="space-y-4">
        {data?.payment_providers
          ?.filter((p) => p.is_enabled)
          ?.map((item) => (
            <label
              key={item.id}
              className={`block border p-4 rounded-md transition-colors cursor-pointer ${
                selectPaymentId === item.id
                  ? "border-main bg-main/10"
                  : "hover:border-main/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment-option"
                    value={item.id}
                    checked={selectPaymentId === item.id}
                    onChange={async (e) =>
                      await handlePaymentProviderSelect(e.target.value)
                    }
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectPaymentId === item.id
                        ? "border-main bg-main"
                        : "border-gray-400"
                    }`}
                  >
                    {selectPaymentId === item.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm">Paiement à la livraison</p>
                </div>
              </div>
            </label>
          ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
