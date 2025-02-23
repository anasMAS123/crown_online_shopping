"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
export type CartItemType = { key?: string; pieces: number; item: string };
interface Props {
  cartItems: CartItemType[];
  setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
}
const CartContext = createContext<Props | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("this context is used outside its area");
  }
  return context;
}
export { useCart, CartProvider };
