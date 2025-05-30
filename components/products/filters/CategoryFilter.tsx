"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function CategorySelect() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sample categories for demonstration
  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home & Kitchen" },
    { value: "sports", label: "Sports & Outdoors" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Label>Categories</Label>
      <Select onValueChange={setSelectedCategory} value={selectedCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
