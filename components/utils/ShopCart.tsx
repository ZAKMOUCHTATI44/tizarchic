"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight , ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import useStore from "@/lib/store";
import Loading from "../ui/Loading";
import ErrorUi from "../ui/ErrorUi";
import Image from "next/image";
import CardProductShopCart from "./CardProductShopCart";
import Cookies from "js-cookie";

export default function ShopCart() {
  const { open, setOpen } = useStore();
  const cookieCart = Cookies.get("CART_ID");

  const { data: cart, isLoading, error } = useCart(cookieCart || "");

  if (error) return <ErrorUi />;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <p className="absolute -top-2 -right-2 bg-main rounded-full h-5 text-sm w-5 text-white flex justify-center items-center">
            {cart && cart.items ? <>{cart.items.length}</> : <>0</>}
          </p>
          <ShoppingCart className="text-gray-500" />
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5 py-5 px-2">
        <SheetHeader>
          <SheetTitle>Panier</SheetTitle>
        </SheetHeader>

        {isLoading && <Loading />}

        {!isLoading && cart && cart.items && cart.items.length > 0 ? (
          <div className="height-fill-available flex flex-col gap-5 border-t pt-5">
            {cart.items.map((item) => (
              <CardProductShopCart
                key={item.id}
                lineId={item.id}
                productId={item.product.id}
                quantity={item.quantity}
              />
            ))}
          </div>
        ) : (
          <div className="height-fill-available flex flex-col justify-center text-center items-center gap-5">
            <Image
              src={"/empty-shop-cart.png?v=12"}
              alt="Empty Shop Cart"
              width={150}
              height={150}
            />
            <p>{`Vous n'avez pas d'articles dans votre panier.`}</p>
          </div>
        )}
        <SheetFooter>
          <div className="flex flex-col gap-2 w-full">
            <SheetClose asChild>
              <Button
                type="submit"
                asChild
                className="w-full bg-main text-white border border-main hover:bg-transparent hover:text-main"
              >
                <Link
                  href={"/checkout"}
                  className="flex items-center justify-center gap-2"
                >
                  <ShoppingCart /> Commander
                </Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                type="submit"
                className="w-full bg-transparent text-main border border-main hover:bg-transparent hover:text-main"
              >
                <div className="flex items-center justify-center gap-2">
                  <ArrowRight /> Poursuivre vos achats
                </div>
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
