"use client";
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

const links = [
  { label: "Accueil", href: "/" },
  {
    label: "Ensembles",
    href: "/products?types=ptyp_01JXVDTS2QJSA39N60QYAF6H9D",
  },
  {
    label: "Abayas",
    href: "/products?types=ptyp_01JXVDV4DKYYY8BH7BRJWNE28D",
  },
  { label: "Châles", href: "/products?types=ptyp_01JXVDVCFAFPS3E43X6GZ5A1TN" },
  {
    label: "Accessoires",
    href: "/products?types=ptyp_01JXXP271B0WMWYTNW73YJH75H",
  },
];

export default function NavMenu() {
  return (
    <div className="flex justify-between items-center">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
            <SheetHeader className="border-b pb-4">
              <SheetTitle>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={35}
                  className="mx-auto"
                />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-6">
              {links.map((link) => (
                <div key={link.label} className="group ">
                  <Link
                    href={link.href}
                    className="font-semibold text-gray-900 px-4 py-2 text-lg rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-6 items-center ">
        {links.map((link) => (
          <div key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center text-gray-900 hover:text-main transition-colors duration-300 ease-in-out relative"
            >
              <span className="relative pb-1 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-main after:transition-all after:duration-300 group-hover:after:w-full">
                {link.label}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
