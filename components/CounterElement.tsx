"use client";
import { CartItemType, useCart } from "@/app/context/CartContext";
import { decrease, increase } from "@/lib/actions";
import React from "react";
import { toast } from "sonner";
const CounterElement = ({
  children,
  title,
  id,
}: {
  children: number;
  title: string;
  id: string;
}) => {
  const { cartItems, setCartItems } = useCart();
  async function handleIncrease() {
    const result = await increase(title);
    if (result.status === 200) {
      toast.success("the quantity is updated successfully");
      setCartItems((prevState: CartItemType[]) => {
        return prevState.map((element: CartItemType) =>
          element.item === title
            ? {
                ...element,
                pieces:
                  element.pieces < 5 ? element.pieces + 1 : element.pieces,
              }
            : { ...element }
        );
      });
      return;
    }
    toast.error("something went wrong try again");
  }
  async function handleDecrease() {
    const result = await decrease(title);
    if (result.status === 200) {
      toast.success("the quantity is updated successfully");

      setCartItems((prevState: CartItemType[]) => {
        return prevState.map((element: CartItemType) =>
          element.item === title
            ? {
                ...element,
                pieces: element.pieces > 1 ? element.pieces - 1 : 0,
              }
            : { ...element }
        );
      });
      return;
    }
    toast.error("something went wrong try again");
  }
  return (
    <div className="flex items-center gap-2">
      <span
        onClick={handleIncrease}
        className="flex rounded-full size-8 justify-center items-center bg-secondary text-primary cursor-pointer"
      >
        +
      </span>
      <span>{children}</span>
      <span
        onClick={handleDecrease}
        className="flex rounded-full size-8 justify-center items-center bg-secondary text-primary cursor-pointer"
      >
        -
      </span>
    </div>
  );
};

export default CounterElement;
