import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const { title, slug, category, image, price, discountPrice, _id } = product;
  return (
    <Link href={`/product/${_id}`}>
      <div className="w-[300px] h-[400px] relative bg-secondary rounded-lg overflow-hidden cursor-pointer hover:scale-90 transition-all before:content-[''] before:absolute before:w-full before:h-full before:top-[100%] hover:before:top-0 before:transition-all before:left-0 before:bg-primary before:opacity-20 before:z-10">
        <div className="h-[60%] relative">
          <Image
            src={image ? image : ""}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>
        <div className="flex flex-col gap-1 px-2">
          <span className="font-bold text-3xl text-primary-light tracking-wide line-clamp-1">
            {title}
          </span>
          <span className="text-xl text-primary">{slug?.current}</span>
          <span className="text-base text-primary">
            {category?.map((item, i) => (
              <span key={item}>
                {category.length - 1 === i ? item : `${item} , `}
              </span>
            ))}
          </span>
          <div className="flex gap-2">
            <span
              className={`text-primary text-2xl ${discountPrice && "line-through"}`}
            >
              {price} E.P
            </span>
            {discountPrice ? (
              <span className={`text-primary text-2xl`}>
                {discountPrice} E.P
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
