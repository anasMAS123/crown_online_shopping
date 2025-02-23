"use client";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const AddToCart = ({ title }: { title: string }) => {
  const { cartItems, setCartItems } = useCart();
  async function handleAddToCart() {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: [{ item: title, pieces: 1 }],
      }),
    });
    const data = await res.json();
    console.log(data.status);
    if (data?.status === 401) {
      toast.error("you should create an account first");
      return;
    }
    setCartItems((prevState) => [
      ...(prevState || []),
      { item: title, pieces: 1 },
    ]);

    toast("The Item Is Added Successfully");
  }

  return (
    <div className="flex items-end max-md:justify-center space-x-2">
      <button
        disabled={cartItems?.some((cartItem) => cartItem.item === title)}
        onClick={handleAddToCart}
        className={`flex ${cartItems?.some((cartItem) => cartItem.item === title) ? "bg-gray-400 text-white" : "bg-secondary text-primary-light hover:scale-90 transition-all"} px-3 py-2  rounded-lg `}
      >
        <span className="flex gap-2 text-3xl">
          {cartItems?.some((cartItem) => cartItem.item === title)
            ? "in the cart"
            : "AddToCart"}
        </span>
        {cartItems?.some((cartItem) => cartItem.item === title) ? (
          ""
        ) : (
          <ShoppingCart className="w-10 h-10" />
        )}
      </button>
      {cartItems?.some((cartItem) => cartItem.item === title) ? (
        <span className="text-primary-dark text-xl">
          Take me to the ,{" "}
          <Link href="/cart">
            <span className="text-secondary font-bold cursor-pointer underline">
              Cart
            </span>
          </Link>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddToCart;
