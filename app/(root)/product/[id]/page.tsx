import AddToCart from "@/components/AddToCart";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const { title, price, discountPrice, category, slug, image, description } =
    await client.fetch(PRODUCT_BY_ID, { id });

  return (
    <div className="min-h-[calc(100vh-76px)] bg-primary-light padding_section px-4 max-md:mx-auto md:padding_content space-y-12">
      <div className="flex flex-col-reverse gap-10 md:flex-row justify-between max-md:text-center">
        <div className="space-y-2">
          <h2 className="text-8xl text-secondary font-bold">{title}</h2>
          <h3 className="text-4xl text-primary-dark font-semibold">
            {slug?.current}
          </h3>
          <p className="text-xl font-bold text-secondary">
            Category :{" "}
            {category?.map((item: string, i: number) => (
              <span key={item}>
                {category.length - 1 === i ? item : `${item} , `}
              </span>
            ))}
          </p>
          <p className="tracking-wide text-3xl text-primary w-[100%]  xl:w-[900px] bg-secondary p-2 rounded-lg">
            <span className="font-bold">Description :</span>
            {description}
          </p>
          <div className="flex  items-center gap-4">
            <span
              className={`text-secondary font-bold text-6xl ${discountPrice && "line-through p-2 bg-primary-dark !text-primary-light rounded-lg"}`}
            >
              {price} E.P
            </span>
            {discountPrice ? (
              <span className={`text-secondary font-bold text-6xl`}>
                {discountPrice} E.P
              </span>
            ) : (
              ""
            )}
          </div>
          <AddToCart title={title} />
        </div>
        <div>
          <div className="w-fit p-0 md:p-10 max-md:mx-auto bg-secondary rounded-lg shadow-xl shadow-secondary">
            <div className="relative w-[300px] h-[400px] ">
              <Image
                src={image}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
