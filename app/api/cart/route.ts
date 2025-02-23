import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { USER_BY_SANITY_ID } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function GET() {
  const session = await auth();

  const user = await client
    .withConfig({ useCdn: false })
    .fetch(USER_BY_SANITY_ID, { id: session?.id });

  return NextResponse.json(user);
}
export async function PATCH(req: Request) {
  try {
    const body = await req.json(); //this should be the sent data ?
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "there is no session", status: 401 });
    }

    const user = await client
      .withConfig({ useCdn: false })
      .fetch(USER_BY_SANITY_ID, { id: session?.id });
    console.log(user);

    const updateCart = await writeClient
      .patch(user?._id)
      .set({
        cart: [...(user?.cart || []), { ...body.cart[0], _key: nanoid() }],
      })
      .commit();

    return NextResponse.json(updateCart);
  } catch {
    console.error("something went wrong , adding failed");
    return NextResponse.json(
      { error: "something went wrong" },
      { statusText: "ERROR" }
    );
  }
}
