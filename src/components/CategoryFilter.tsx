"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories?: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CategoryFilter = ({
  categories = ["All", "AI", "Bots", "Web"],
  activeCategory = "All",
  onCategoryChange = () => {},
}: CategoryFilterProps) => {
  return (
    <div className="bg-purple-950 p-4 rounded-lg w-full max-w-[500px] mx-auto">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className={cn(
              "transition-all duration-300",
              activeCategory === category
                ? "bg-purple-600 hover:bg-purple-500 text-white border-purple-400"
                : "bg-purple-900/50 hover:bg-purple-800 text-purple-200 border-purple-700",
              "min-w-[80px] relative overflow-hidden group",
            )}
          >
            <span className="relative z-10">{category}</span>
            {activeCategory === category && (
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-70"></span>
            )}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
