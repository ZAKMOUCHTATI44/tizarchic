import AboutUs from "@/components/home/AboutUs";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import OurValues from "@/components/home/OurValues";
import ProductsCollection from "@/components/home/ProductsCollection";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Tizarchic – Berbère Chic",
};
const Page = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <ProductsCollection />
      <OurValues />
      <Faq />
    </>
  );
};

export default Page;
