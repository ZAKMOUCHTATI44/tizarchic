"use client";
import React from "react";
import Image from "next/image";
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorUi from "../ui/ErrorUi";
import Loading from "../ui/Loading";
import { useDeleteItem, useUpdateItem } from "@/lib/cart";
import Cookies from "js-cookie";

const CardProductShopCart = ({
  quantity,
  productId,
  lineId,
}: {
  quantity: number;
  productId: string;
  lineId: string;
}) => {
  const buildQueryString = `/products/${productId}?fields=*variants.calculated_price`;

  const deleteItem = useDeleteItem();
  const updateItem = useUpdateItem();
  const cartId = Cookies.get("CART_ID");

  const queryClient = useQueryClient();

  async function fetchData() {
    const res = await axiosInstance.get(buildQueryString);
    return res.data.product;
  }
  const { data, isLoading, error } = useQuery<Product>({
    queryKey: [buildQueryString],
    queryFn: fetchData,
  });

  if (error) return <ErrorUi />;

  if (isLoading) return <Loading />;

  return (
    <div>
      {data && (
        <div className="flex items-center gap-2">
          <Image
            src={data.thumbnail ?? ""}
            alt={data.title ?? ""}
            width={65}
            height={65}
            className="rounded-full h-[70px] w-[70px]"
          />
          <div className="flex justify-between items-center w-[80%]">
            <div className="flex flex-col">
              <p className="text-xs">{data.title}</p>

              <div>
                <div className="flex">
                  <div className="flex justify-center py-2 rounded-md">
                    <button
                      onClick={() => {
                        // decrementItemQuantity(products[0].id ?? "");
                        if (cartId) {
                          updateItem({
                            cartId,
                            lineId,
                            quantity: quantity - 1,
                          });
                        }
                      }}
                      className="flex items-center rounded-md justify-center bg-main ml-2"
                    >
                      <Minus className="text-white px-1" />
                    </button>
                    <span className="mx-3 text-xl">{quantity} </span>
                    <button
                      onClick={() => {
                        if (cartId) {
                          updateItem({
                            cartId,
                            lineId,
                            quantity: quantity + 1,
                          });
                        }
                      }}
                      className="flex items-center rounded-md justify-center bg-main mr-2"
                    >
                      <Plus className="text-white p-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-8 h-8">
              <Button
                size={"icon"}
                className="bg-transparent text-gray-600 border border-gray-600 hover:bg-transparent"
                onClick={() => {
                  if (cartId) {
                    deleteItem({ cartId, lineId });
                    queryClient.invalidateQueries({
                      queryKey: ["cart", cartId],
                    });
                    console.log("Remove the QUERY ");
                  }
                }}
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProductShopCart;
