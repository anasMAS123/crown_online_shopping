import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
interface Props {
  title: string;
  elements: string[];
}
const CategoryList = ({ title, elements }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <span className="flex items-center gap-1 ">
          <span>{title.toUpperCase()}</span>
          <ChevronDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary text-secondary">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {elements.map((item, index) => (
          <Link
            href={`/shopping/${title.toLowerCase()}/${item.toLowerCase()}`}
            key={index}
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary hover:text-primary">
              {item.toUpperCase()}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryList;
