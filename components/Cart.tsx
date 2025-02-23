"use client";
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  useEffect(() => {
    async function getCartData() {
      const res = await fetch("/api/cart");
      const data = await res.json();
      console.log(data?.cart);
      setCartItems(data?.cart);
    }
    getCartData();
  }, [setCartItems]);

  return (
    <Link href="/cart">
      <span className="relative">
        {cartItems?.length > 0 ? (
          <span className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-secondary text-center text-primary-light flex items-center justify-center">
            {cartItems?.length > 9 ? "+9" : cartItems?.length}
          </span>
        ) : (
          ""
        )}

        <ShoppingCart className="text-secondary" />
      </span>
    </Link>
  );
};

export default Cart;
