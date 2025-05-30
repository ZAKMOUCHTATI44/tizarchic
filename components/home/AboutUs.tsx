import React from "react";

const AboutUs = () => {
  return (
    <div className="my-24 container mx-auto grid lg:grid-cols-2 gap-16 items-center px-5 max-w-7xl">
        <div className="bg-red-500 w-full h-full bg-no-repeat bg-cover bg-center rounded-xl" style={{backgroundImage:"url(/about.jpg)"}}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-main/10 to-gray-100/30 z-10"></div>
        </div>
      </div>
      <div className="flex flex-col gap-7 font-serif py-12">
        <div className="flex flex-col gap-4">
          <p className="font-medium text-gray-600 uppercase tracking-widest">
            Pourquoi Tizarchic ?
          </p>
          <div className="w-20 h-px bg-main mb-4"></div>
        </div>
        <h3 className="text-3xl lg:text-5xl font-light tracking-wide text-main -800 leading-tight">
          {` La touche berbère qui sublime votre style .`}
        </h3>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="border-l-4 border-main rounded-xl pl-4">
            {`Chez Tizar Chic, la mode est bien plus qu’un simple vêtement — c’est une manière de célébrer notre héritage tout en affirmant notre féminité moderne. Inspirée par la richesse de la culture berbère et les tendances contemporaines, notre marque propose une sélection unique d’ensembles, d’abayas, de châles et d’accessoires pensés pour la femme d’aujourd’hui.`}
          </p>
          <p>
            {`Chaque pièce est soigneusement choisie pour allier élégance, confort et originalité, tout en mettant à l’honneur des détails traditionnels réinterprétés avec modernité. Notre ambition est de permettre à chaque femme de se sentir belle, confiante et connectée à ses racines, où qu’elle soit.`}
          </p>
          <p className="italic text-gray-600">
            {`Faites l'expérience du luxe authentique, choisissez `}
            <span className="text-main font-medium not-italic">Tizarchic.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;