import { Crown } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-primary-light padding_section padding_content space-y-12 flex justify-center items-center">
      <div className="flex gap-2 flex-col items-center">
        <Crown className="size-20 md:size-32 text-[#FFD700]" />
        <p className=" text-secondary font-3xl font-bold">
          THANKS FOR ORDERING FROM{" "}
          <span className="text-[#FFD700] bg-secondary px-2 py-1 rounded-lg">
            CROWN
          </span>
        </p>
        <p className=" text-secondary font-3xl font-base">
          your order will be delivered to you within 3 days
        </p>
        <Link href="/" className="underline text-primary-dark">
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default Page;
