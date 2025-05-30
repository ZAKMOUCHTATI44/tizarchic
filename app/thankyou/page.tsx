"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import Cookies from "js-cookie";

const Page = () => {
  useEffect(() => {
    Cookies.remove("CART_ID");
  });
  return (
    <div className="min-h-[60vh] flex flex-col gap-3 text-center justify-center items-center overflow-hidden">
      <Confetti
        numberOfPieces={200}
        gravity={0.1}
        className="!w-full h-[100vh]"
        tweenDuration={2000}
      />
      <Image
        src="/thanks.png"
        className="mx-auto my-5"
        width={95}
        height={95}
        alt="Thank you icon"
      />
      <h2 className="text-3xl font-semibold ">Merci pour votre commande!</h2>
      <p>Nous vous contacterons pour confirmer votre demande</p>
      <p className="text-base text-gray-700">Merci pour votre demande !</p>
      <Button
        asChild
        className="px-24 py-3 bg-main border border-main hover:bg-transparent hover:text-main uppercase"
      >
        <Link href={"/"}>Poursuivre vos achats</Link>
      </Button>
    </div>
  );
};

export default Page;
