"use client";
import { useState, useRef, type KeyboardEvent } from "react";
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command as CommandPrimitive,
} from "cmdk";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import axiosInstance from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorUi from "../ui/ErrorUi";
import Image from "next/image";
import Link from "next/link";
export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    if (!isOpen) {
      setOpen(true);
    }
    if (event.key === "Escape") {
      input.blur();
    }
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const buildQueryString = `/products?fields=*variants.calculated_price&limit=10&q=${inputValue}`;

  async function fetchData() {
    const res = await axiosInstance.get(buildQueryString);
    return res.data;
  }
  const { data, isLoading, error } = useQuery<ProductPagination>({
    queryKey: [buildQueryString],
    queryFn: fetchData,
    enabled: !!inputValue,
  });

  if (error) return <ErrorUi />;

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          className="w-80 flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder={`Recherchez vos chaussures`}
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white dark:bg-darkColor outline-none border border-whiteColor ",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-0 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {data && data.count > 0 && !isLoading ? (
              <CommandGroup>
                {data.products.map((product) => {
                  // const isSelected = selected?.name === option.name;
                  return (
                    <CommandItem
                      key={product.id}
                      value={product.id}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => {
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 hover:bg-mainColor data-[selected=true]:bg-mainColor p-2 border"
                      )}
                    >
                      <Link href={`/products/${product.handle}`} className="flex items-center gap-2">
                        <Image
                          src={product.thumbnail ?? ""}
                          alt={product.title ?? ""}
                          width={30}
                          height={30}
                          className="rounded-full h-[50px] w-[50px]"
                        />
                        <div className="flex justify-between items-center w-[80%]">
                          <div className="flex flex-col">
                            <p className="text-xs">{product.title}</p>
                          </div>
                        </div>
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                Not found
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
}
