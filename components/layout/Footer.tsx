import { ChevronRight, Clock, Mail, MapPinIcon, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const social = [
    { href: "facebook.com", icon: "/social-media/facebook.png" },
    { href: "instagram.com", icon: "/social-media/instagram.png" },
    { href: "youtube.com", icon: "/social-media/youtube.png" },
  ];
  const links = [
    { label: "Accueil", href: "/" },
    {
      label: "Ensembles",
      href: "/ensembles",
    },
    {
      label: "Abayas",
      href: "/abayas",
    },
    { label: "Châles", href: "/chales" },
    { label: "Accessoires", href: "/accessoires" },
  ];

  return (
    <footer className="bg-black py-24 text-gray-300">
      <div className="container mx-auto px-4 grid lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Magnus logo" width={80} height={40} />
          </div>
          <p className="text-sm leading-relaxed">
            Magnus est une marque de chaussures et accessoires haut de gamme,
            alliant confort, qualité et design moderne. Avec des créations
            élégantes et durables, Magnus offre des produits stylés pour un
            confort optimal au quotidien.
          </p>
          <div className="border-t border-gray-700 w-3/4" />
          <div className="space-y-2">
            <div className="flex gap-3">
              {social.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-2 hover:opacity-75 transition-opacity"
                >
                  <Image
                    src={link.icon}
                    alt={link.href}
                    width={30}
                    height={30}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="lg:col-span-3 grid lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="space-y-6">
            <h5 className="font-serif text-lg text-white">Navigation</h5>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href || ""}
                    className="flex items-center gap-2 hover:text-main transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-main" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h5 className="font-serif text-lg text-white">Nous contacter</h5>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPinIcon className="h-5 w-5 text-main mt-1" />
                <span>
                  2, bis rue Dupont de Eure
                  <br />
                  75020 Paris
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-main" />
                contact@magnus.ma
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-main" />
                +32 485 21 21 99
              </li>
              <li className="flex gap-3 items-center">
                <Clock className="h-5 w-5 text-main" />
                Lun-Ven: 08:30 - 12:30
              </li>
            </ul>
          </div>

          {/* Categories */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
