"use client";
import axiosInstance from "@/lib/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const cookieCart = Cookies.get("CART_ID");

  useEffect(() => {
    if (! cookieCart) {
      axiosInstance
          .post("/carts")
          .then((res) => {
            Cookies.set("CART_ID", res.data.cart.id);
          })
          .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [cookieCart]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
