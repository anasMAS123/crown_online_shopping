import ItemsSlider from "@/components/ItemsSlider";
import { client } from "@/sanity/lib/client";
import { GET_PRODUCTS } from "@/sanity/lib/queries";
import React from "react";

const Page = async ({
  params,
}: {
  params: { category: string; subCategory: string };
}) => {
  const { category, subCategory } = await params;
  const products = await client.fetch(GET_PRODUCTS);
  return (
    <div className="min-h-[calc(100vh-76px)] bg-primary-light padding_section padding_content space-y-12">
      <div className="relative w-fit">
        <h2 className={` relative text-8xl font-bold text-secondary `}>
          {category}
        </h2>
        <span className="absolute text-4xl left-1/2 font-semibold text-primary-dark">
          {subCategory}
        </span>
      </div>
      <div>
        <ItemsSlider items={products} />
      </div>
    </div>
  );
};

export default Page;
