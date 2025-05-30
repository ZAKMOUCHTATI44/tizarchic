import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative lg:min-h-[75vh] min-h-[60vh] bg-hero  flex flex-col items-center justify-center text-center overflow-hidden text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/25 z-10" />

      {/* Content container */}
      <div className="relative z-20 max-w-4xl px-4 space-y-6 lg:space-y-8">
        <h2 className="font-playfair text-4xl lg:text-6xl xl:text-7xl font-medium leading-tight">
          <span className="block text-5xl lg:text-4xl xl:text-5xl font-bold italic text-gold mb-4">
            Soyez unique. Soyez Tizar Chic.
          </span>
        </h2>

        {/* Decorative separator */}
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <p className="font-lora text-sm lg:text-3xl max-w-2xl mx-auto leading-relaxed">
          Découvrez une collection unique de vêtements féminins alliant
          tradition et modernité
        </p>

        <Button
          asChild
          className="px-12 py-6 bg-main hover:bg-main text-white uppercase tracking-widest text-sm font-semibold transition-all duration-300 transform hover:scale-105"
        >
          <Link href={"/products"}>Découvrir la collection</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
