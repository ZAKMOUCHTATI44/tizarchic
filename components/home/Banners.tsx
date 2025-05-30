import Link from "next/link";
import React from "react";

const Banners = () => {
  const images = [
    {
      image: "/men-fashion.jpg",
      title: "Nos modèles",
      subtitle: "Femme",
    },
    {
      image: "/women-fashion.jpg",
      title: "Nos modèles",
      subtitle: "Homme",
    },
    {
      image: "/men-fashion.jpg",
      title: "Nos modèles",
      subtitle: "Femme",
    },
    {
      image: "/women-fashion.jpg",
      title: "Nos modèles",
      subtitle: "Homme",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((item, index) => (
        <Link
          href={"/products"}
          key={index}
          className="relative h-[400px] w-full bg-center bg-cover rounded-xl p-5 flex flex-col justify-end overflow-hidden"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative z-10 text-white">
            <h5 className="text-5xl font-semibold">{item.title}</h5>
            <p className="font-medium text-4xl">{item.subtitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Banners;
