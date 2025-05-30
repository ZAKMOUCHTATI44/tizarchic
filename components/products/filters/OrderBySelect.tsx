"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const OrderBySelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value.length > 0) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Select
      onValueChange={(e) => {
        router.replace(`${pathname}?${createQueryString("orderby", e)}`, {
          scroll: false,
        });
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="-created_at">Le plus récent</SelectItem>
        <SelectItem value="created_at">Le plus ancien</SelectItem>
        {/* <SelectItem value="price_desc">Prix</SelectItem>
        <SelectItem value="variants.calculated_price">Prix décroissant</SelectItem> */}
      </SelectContent>
    </Select>
  );
};

export default OrderBySelect;
