"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Price = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, maxPrice] = (
    searchParams.get("prices")?.split("-") ?? ["0", "2000"]
  ).map(String);

  const [range, setRange] = useState<number[]>([+minPrice, +maxPrice]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.replace(
      `${pathname}?${createQueryString("prices", range.join("-"))}`,
      { scroll: false }
    );
  }, [range, router, createQueryString, pathname]);
  const handleRangeChange = (value: number[]) => {
    setRange(value);
  };

  return (
    <div className="flex flex-col gap-2 pb-5 border-b border-gray-400">
      <Label className="text-center">Choissiez votre fourchette</Label>
      <div>
        <Slider
          minStepsBetweenThumbs={10}
          max={2000}
          min={0}
          step={1}
          value={range}
          onValueChange={handleRangeChange}
        />
        <div className="flex justify-between">
          <p className="flex justify-between">{range[0]} MAD</p>
          <p>{range[1]} MAD</p>
        </div>
      </div>
    </div>
  );
};

export default Price;
