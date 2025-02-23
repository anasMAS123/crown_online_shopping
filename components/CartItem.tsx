"use client";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/sanity.types";
import React from "react";
import CounterElement from "./CounterElement";
import { ArrowDown, X } from "lucide-react";
import { deleteElement } from "@/lib/actions";
import { toast } from "sonner";
const CartItem = ({ element }: { element: Product }) => {
  const { cartItems, setCartItems } = useCart();
  const { _id, price, discountPrice, title, image } = element;
  const finalPrice = discountPrice! > 0 ? discountPrice : price;
  const quantity = cartItems.filter((item) => item.item === title)[0]?.pieces;
  async function handleDelete() {
    setCartItems((prevState) => {
      const newItemsArray = prevState.filter(
        (element) => element.item != title
      );
      return [...newItemsArray];
    });
    const result = await deleteElement(title!);
    if (result.status === 200) {
      toast.success("the item is deleted successfully");
    } else {
      toast.error("the item is not deleted , try again");
    }
  }
  return (
    <div className="flex bg-primary rounded-lg p-10 gap-4 ">
      <div className="w-[15%]">
        <img src={image || ""} alt={title || ""} className="rounded-lg" />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <span className="text-secondary text-4xl font-bold">{title}</span>
        <span className="text-secondary text-3xl font-bold">
          <span>{discountPrice! > 0 ? discountPrice : price} E.P</span>
          <span>
            {" "}
            {quantity > 0 && (
              <span>
                <ArrowDown /> {quantity * finalPrice!}
              </span>
            )}
          </span>
        </span>
        <span className="font-semibold text-secondary text-2xl">
          Quantity :
          <CounterElement title={title!} id={_id}>
            {quantity}
          </CounterElement>
        </span>
      </div>
      <div className="w-[15%] font-bold text-secondary flex justify-end">
        <X onClick={handleDelete} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CartItem;
