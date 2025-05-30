import { useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "./api";

const fetchCart = async (cartId: string) => {
  const { data } = await axiosInstance.get(`/carts/${cartId}`);
  return data.cart;
};

export const useCart = (cartId: string) => {
  return useQuery<Cart>({
    queryKey: ["cart", cartId],
    queryFn: () => fetchCart(cartId),
    enabled: !!cartId,
  });
};

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  const addItemToCart = async ({
    cartId,
    variantId,
    quantity,
  }: {
    cartId: string;
    variantId: string;
    quantity: number;
  }) => {
    const { data } = await axiosInstance.post(`/carts/${cartId}/line-items`, {
      variant_id: variantId,
      quantity,
      metadata: {},
    });
    queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    return data;
  };

  return addItemToCart; // Return the function to be used in components
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const deleteItem = async ({
    cartId,
    lineId,
  }: {
    cartId: string;
    lineId: string;
  }) => {
    await axiosInstance.delete(`/carts/${cartId}/line-items/${lineId}`);
    queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
  };

  return deleteItem;
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  const updateItem = async ({
    cartId,
    lineId,
    quantity,
  }: {
    cartId: string;
    lineId: string;
    quantity: number;
  }) => {
    await axiosInstance.post(`/carts/${cartId}/line-items/${lineId}`, {
      quantity,
    });
    queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
  };

  return updateItem;
};

