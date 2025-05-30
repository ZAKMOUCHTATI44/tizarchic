"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputWithLabel from "../ui/InputWithLabel";
import { Button } from "../ui/button";
import PhoneNumber from "../ui/phone-number";
import axiosInstance from "@/lib/api";
import Cookies from "js-cookie";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const validationSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  firstName: Yup.string().required("Le prénom est requis"),
  lastName: Yup.string().required("Le nom est requis"),
  address: Yup.string().required("L'adresse est requise"),
  phone: Yup.string().required("Le numéro de téléphone est requis"),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, "Code postal invalide")
    .required("Le code postal est requis"),
  city: Yup.string().required("La ville est requise"),
});

const UserInfo = () => {
  const cartId = Cookies.get("CART_ID");
  const { refetch } = useCart(cartId || "");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      city: "",
      phone: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const address = {
          first_name: values.firstName,
          last_name: values.lastName,
          address_1: values.address,
          postal_code: values.postalCode,
          city: values.city,
          phone: values.phone,
        };

        await axiosInstance.post(`/carts/${cartId}`, {
          email: values.email,
          // shipping_address: address,
          billing_address: address,
        });

        await refetch();

        await axiosInstance.post(`/carts/${cartId}/complete`);
        router.push("/thankyou");
      } catch (error) {
        console.error("Address update failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="border p-5 rounded-md">
      <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4">
        Vos coordonnées
      </h2>
      <div className="space-y-3">
        <InputWithLabel
          label="E-mail"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            label="Prénom"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName}
          />
          <InputWithLabel
            label="Nom"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName}
          />
        </div>
        <PhoneNumber
          label="Numéro de téléphone"
          onChange={(value) => formik.setFieldValue("phone", value)}
          error={formik.errors.phone}
          value={formik.values.phone}
        />

        <InputWithLabel
          label="Adresse"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            label="Code postal"
            name="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={formik.errors.postalCode}
          />
          <InputWithLabel
            label="Ville"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city}
          />
        </div>

        <Button type="submit" className="w-full bg-main hover:bg-main/90">
          {isLoading ? <div> <Loader className="animate-spin" /> </div> : <div>Valider ma commande</div>}
        </Button>
      </div>
    </form>
  );
};

export default UserInfo;
