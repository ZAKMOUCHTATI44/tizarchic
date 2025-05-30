import React from "react";
import OrderInfo from "@/components/checkout/OrderInfo";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import UserInfo from "@/components/checkout/UserInfo";
import { Metadata } from "next";
import ShippingOption from "@/components/checkout/ShippingOption";

export const metadata: Metadata = {
  title: "Finalisez Votre Achat – Magnus",
};

const Page = () => {
  return (
    <>
      <div className="my-12 container mx-auto grid lg:grid-cols-5 gap-5 relative">
        <div className=" col-span-3 h-full flex flex-col gap-5">
          <UserInfo />
          <ShippingOption />
          <PaymentMethod />
        </div>
        <OrderInfo />
      </div>
    </>
  );
};

export default Page;
