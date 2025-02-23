import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Props {
  image: string;
  category: string;
  subCategory: string;
}
const SectionCard = ({ image, category, subCategory }: Props) => {
  return (
    <Link href={`/shopping/${category}/${subCategory}`}>
      <div
        className="group h-[350px] bg-primary shadow-sm shadow-secondary   hover:scale-90 transition-all cursor-pointer relative before:content-[''] before:w-20 before:h-20 before:rounded-full before:bg-secondary before:z-10 before:-top-6 before:-left-5 before:absolute overflow-hidden
       "
      >
        <div className="w-full h-[200px] relative overflow-hidden  ">
          <Image src={image} alt="category" layout="fill" objectFit="cover" />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <span className="flex items-center justify-between">
            <span className="text-3xl font-semibold text-secondary">
              {category.toUpperCase()}
            </span>
            <ArrowRight className="group-hover:animate-bounceCustom" />
          </span>
          <h4 className="text-xl text-primary-dark">
            {subCategory.toUpperCase()}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;
