import { auth, signIn, signOut } from "@/auth";
import Cart from "@/components/Cart";
import CategoryList from "@/components/CategoryList";
import { Crown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();
  return (
    <div className="min-h-screen flex flex-col relative">
      <nav className="bg-primary-light py-[20px]  flex justify-between items-center padding_content">
        <div className="flex items-center gap-5 outline-none">
          <Link href="/">
            <span className="flex items-center gap-1 text-3xl">
              <Crown className="text-[#FFD700]" />
              <span className="font-bold text-secondary">Crown</span>
            </span>
          </Link>
          <div className="hidden lg:flex gap-4">
            <CategoryList title="clothes" elements={["men", "women", "kids"]} />
            <CategoryList title="Sports" elements={["men", "women", "kids"]} />
          </div>
        </div>
        <div className="flex gap-4">
          {session && (
            <>
              <Cart />
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <LogOut className="text-secondary" />
                </button>
              </form>
            </>
          )}
          {!session && (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button className="bg-secondary text-primary text-base rounded-lg flex gap-2 items-center px-3 py-2">
                <Image src="/google.png" alt="google" width={20} height={20} />
                <span>Sign in</span>
              </button>
            </form>
          )}
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              alt="img"
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
        </div>
      </nav>
      <div className="flex flex-col items-center bg-primary-light lg:hidden gap-4">
        <CategoryList title="clothes" elements={["men", "women", "kids"]} />
        <CategoryList title="Sports" elements={["men", "women", "kids"]} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
