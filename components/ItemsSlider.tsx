"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

const ItemsSlider = ({ items }: { items: Product[] }) => {
  return (
    <Carousel
      className="w-[80%] mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}
    >
      <CarouselContent>
        {items.map((item, i) => (
          <CarouselItem key={i} className=" md:basis-1/2 xl:basis-1/3">
            <ProductCard product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext className="" />
    </Carousel>
  );
};

export default ItemsSlider;
