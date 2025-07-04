import React, { Suspense } from "react";
import BannerProducts from "@/components/products/BannerProducts";
import ListProducts from "@/components/products/ListProducts";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nos Créations – Chaussures et Sacs en Cuir Véritable",
};

const Page = () => {
  return (
    <div>
      <BannerProducts
        title="Soyez unique. Soyez Tizar Chic."
        description={""}
      />
      <Suspense>
        <div className="my-24 mx-auto px-5 flex flex-col gap-5">
          {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="col-span-1 px-6 h-[700px] sticky top-0">
              <FilterProducts />
            </div>
            <div className="col-span-3">
              <div className="pb-5 flex justify-end">
                <OrderBySelect />
                <ListProducts />
              </div>
            </div>
          </div> */}

          <p className="text-2xl text-gray-600 font-light leading-relaxed text-center">
            Élégante, moderne et délicatement conçue, chaque pièce Tizar Chic
            incarne le raffinement. Nos abayas, châles et accessoires sont
            soigneusement confectionnés pour offrir une alliance parfaite entre
            style intemporel et confort au quotidien.
          </p>
          <ListProducts />
        </div>
      </Suspense>
    </div>
  );
};

export default Page;
