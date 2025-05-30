import Image from "next/image";
import React from "react";

const OurValues = () => {
  const data = [
    {
      label: "livraison express",
      image: "/homepage/icons/livraison-express.png",
    },
    {
      label: "paiement à la livraison",
      image: "/homepage/icons/paiement-securise.png",
    },
    {
      label: "qualité superieure",
      image: "/homepage/icons/controle-de-qualite.png",
    },
    {
      label: "retour et échange possible",
      image: "/homepage/icons/retour-de-produit.png",
    },
  ];
  return (
    <div className="my-24 container mx-auto px-4">
      <div className="flex flex-col gap-4 text-center items-center mb-16">
        <h2 className="text-2xl lg:text-4xl font-serif font-medium text-gray-800">
          {`Nos Engagements pour une Expérience d'Achat Sereine`}
        </h2>
        <div className="w-20 h-1 bg-amber-600 mb-6" />
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
          Nous nous engageons à vous offrir un service de qualité pour un
          shopping sans souci :
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((item) => (
          <div
            key={item.label}
            className="relative bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden"
          >
            <div className="p-8 flex flex-col items-center text-center">
              <div className="mb-6">
                <Image 
                  src={item.image} 
                  alt={item.label} 
                  width={64} 
                  height={64}
                  className="text-gray-700"
                />
              </div>
              <h3 className="text-lg font-serif font-medium text-gray-800 uppercase tracking-wide">
                {item.label}
              </h3>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValues;