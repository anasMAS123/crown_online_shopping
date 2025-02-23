"use server";

import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { PRODUCTS_BY_NAME, USER_BY_SANITY_ID } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function getProductsByName(array: string[]) {
  const res = await client.fetch(PRODUCTS_BY_NAME, { array });

  return res;
}
export async function increase(name: string) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "there is no session", status: 401 });
    }

    const user = await client
      .withConfig({ useCdn: false })
      .fetch(USER_BY_SANITY_ID, { id: session?.id });

    const updateCart = await writeClient
      .patch(user?._id)
      .set({
        cart: [...(user?.cart || [])].map((obj) =>
          obj.title === name
            ? obj
            : { ...obj, pieces: obj.pieces < 5 ? obj.pieces + 1 : obj.pieces }
        ),
      })
      .commit();

    return { status: 200, updateCart };
  } catch {
    console.error("something went wrong , adding failed");
    return { error: "something went wrong", status: 401 };
  }
}
export async function decrease(name: string) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "there is no session", status: 401 });
    }

    const user = await client
      .withConfig({ useCdn: false })
      .fetch(USER_BY_SANITY_ID, { id: session?.id });

    const updateCart = await writeClient
      .patch(user?._id)
      .set({
        cart: [...(user?.cart || [])].map((obj) =>
          obj.title === name
            ? obj
            : { ...obj, pieces: obj.pieces! > 0 ? obj.pieces! - 1 : obj.pieces }
        ),
      })
      .commit();

    return { status: 200, updateCart };
  } catch (error) {
    console.log(error);
    console.error("something went wrong , adding failed");
    return { error: "something went wrong", status: 401 };
  }
}
export async function deleteElement(deleteTitle: string) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "there is no session", status: 401 });
    }

    const user = await client
      .withConfig({ useCdn: false })
      .fetch(USER_BY_SANITY_ID, { id: session?.id });
    const index = user?.cart?.findIndex((obj) => obj.item === deleteTitle);
    if (index === -1) return { error: "item is not found", status: 404 };
    const updateCart = await writeClient
      .patch(user?._id)
      .unset([`cart[${index}]`])
      .commit();

    return { status: 200, updateCart };
  } catch {
    console.error("something went wrong , adding failed");
    return { error: "something went wrong", status: 401 };
  }
}

export async function submitOrder(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    cart: JSON.parse(formData.get("cart") as string),
  };
  try {
    const orderNamesList = JSON.parse(formData.get("cart") as string).map(
      (obj) => obj.item
    );

    const productsList = await client.fetch(PRODUCTS_BY_NAME, {
      array: orderNamesList,
    });

    const order = JSON.parse(formData.get("cart") as string).map((product) => {
      const targetProduct = productsList.filter(
        (item) => item.title === product.item
      )[0];
      const priceBeforeDiscount = targetProduct.price;
      const priceAfterDiscount = targetProduct.discountPrice
        ? targetProduct.discountPrice
        : -1;
      const finalPrice = targetProduct.discountPrice
        ? targetProduct.discountPrice * product.pieces
        : targetProduct.price * product.pieces;
      return {
        item: product.item,
        pieces: product.pieces,
        priceBeforeDiscount,
        priceAfterDiscount,
        finalPrice,
        _key: nanoid(),
      };
    });

    await writeClient.create({ _type: "order", ...data, cart: order });

    const session = await auth();

    const user = await client
      .withConfig({ useCdn: false })
      .fetch(USER_BY_SANITY_ID, { id: session?.id });

    await writeClient.patch(user?._id).set({ cart: [] }).commit();

    return { ...prevState, error: "", status: "SUCCESS" };
  } catch (error) {
    return { ...prevState, error, status: "ERROR" };
  }
}
