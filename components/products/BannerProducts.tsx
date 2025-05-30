import React from "react";
import "@/app/bg-products.css";
const BannerProducts = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="py-32 bg-products text-center text-white relative">
      {/* Overlay with subtle pattern */}
      <div className="absolute inset-0 bg-black bg-pattern opacity-50"></div>

      <div className="relative z-10 text-white max-w-4xl mx-auto px-4">

        <h2 className="font-playfair text-6xl font-bold mb-6 tracking-wide">
          {title}
        </h2>
        {description && (
          <p className="font-cormorant text-xl text-gold-300 italic max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BannerProducts;
