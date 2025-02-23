"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { getProductsByName, submitOrder } from "@/lib/actions";
import { Product } from "@/sanity.types";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const { cartItems, setCartItems } = useCart();
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>();
  const router = useRouter();

  async function handleOrder(prevState: any, formData: FormData) {
    try {
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        cart: JSON.parse(formData.get("cart") as string),
      };
      await formSchema.parseAsync(data);

      const result = await submitOrder(prevState, formData);
      console.log(result);

      if (result.status === "SUCCESS") {
        setCart([]);
        setCartItems([]);
        router.push("/thanks");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setFormErrors(errors as unknown as Record<string, string>);
        toast.error("check the fields and try again");
        return {
          ...prevState,
          error: "check the fields and try again",
          status: "ERROR",
        };
      } else {
        toast.error("something went wrong please try again");
        return {
          ...prevState,
          error: "something went wrong please try again",
          status: "ERROR",
        };
      }
    }
  }
  const [state, formAction, pending] = useActionState(handleOrder, {
    error: "",
    status: "INITIAL",
  });

  useEffect(() => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      setCart([]);
      setLoading(false);
      return;
    }

    async function getData() {
      const data = await getProductsByName([
        ...cartItems?.map((item) => item.item),
      ]);
      setCart(data);
      setLoading(false);
    }
    getData();
  }, [cartItems]);
  return (
    <div className="min-h-[calc(100vh-76px)] bg-primary-light padding_section padding_content space-y-12">
      <div className="flex gap-4 flex-col p-10 bg-secondary rounded-lg shadow-lg shadow-secondary">
        {loading ? (
          <div className="h-10 w-10 border-4 border-gray-300 border-t-secondary rounded-full animate-spin"></div>
        ) : cart.length > 0 ? (
          cart?.map((item) => <CartItem key={item._id} element={item} />)
        ) : (
          <span className="text-3xl text-primary">no items is added yet.</span>
        )}

        {cart?.length > 0 && (
          <div className="padding_section">
            <form action={formAction}>
              <div className="flex flex-col space-y-5">
                <div
                  className="flex gap-2 items-start
                flex-col"
                >
                  <label
                    htmlFor="name"
                    className="w-20 text-primary-dark text-xl"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-[100%] bg-primary text-secondary py-[10px] rounded-lg outline-none px-5"
                  />

                  {formErrors?.name && (
                    <p className="text-xl text-primary">{formErrors.name}</p>
                  )}
                </div>
                <div
                  className="flex gap-2 items-start
                flex-col"
                >
                  <label
                    htmlFor="email"
                    className="w-20 text-primary-dark text-xl"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={session?.user?.email as string}
                    readOnly
                    className="w-[100%] bg-primary-dark text-secondary py-[10px] rounded-lg outline-none px-5"
                  />

                  {formErrors?.email && (
                    <p className="text-xl text-primary">{formErrors.email}</p>
                  )}
                </div>

                <div
                  className="flex gap-2 items-start
                flex-col"
                >
                  <label
                    htmlFor="phone"
                    className="w-20 text-primary-dark text-xl"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    className="w-[100%] bg-primary text-secondary py-[10px] rounded-lg outline-none px-5"
                  />

                  {formErrors?.phone && (
                    <p className="text-xl text-primary">{formErrors.phone}</p>
                  )}
                </div>

                <div
                  className="flex gap-2 items-start
                flex-col"
                >
                  <label
                    htmlFor="address"
                    className="w-20 text-primary-dark text-xl"
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    className="w-[100%] bg-primary text-secondary py-[10px] rounded-lg outline-none px-5"
                  ></textarea>
                  {formErrors?.address && (
                    <p className="text-xl text-primary">{formErrors.address}</p>
                  )}
                </div>
                <input
                  type="hidden"
                  name="cart"
                  value={JSON.stringify(cartItems)}
                />
                <Button
                  type="submit"
                  className="py-8 text-3xl font-bold text-secondary transition-all w-[clac(100%-80px)]"
                >
                  Order
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
