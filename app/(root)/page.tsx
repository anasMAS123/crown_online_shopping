import { auth, signIn } from "@/auth";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <section className="flex-1 padding_content bg-primary-light min-h-[calc(100vh-76px)] relative">
        <div className="padding_section flex items-start justify-between">
          <div className="space-y-4 lg:text-8xl md:text-6xl sm:text-4xl  text-center lg:text-left">
            <h2 className="lg:text-8xl sm:text-4xl text-2xl  font-semibold">
              WELCOME TO <span className="text-secondary">CROWN</span> THE
              DISTNATION FOR LUXURIOUS CLOTHES.
            </h2>
            <div className="block lg:hidden relative w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] shadow-lg left-1/2 -translate-x-1/2">
              <Image
                src="/main-brown.jpg"
                alt="main-brown"
                className="rounded-lg block"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex gap-3 w-full justify-center lg:justify-normal">
              {!session && (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google");
                  }}
                >
                  <Button
                    type="submit"
                    className="bg-secondary text-white hover:text-secondary flex gap-2"
                  >
                    <span>Signin with Google</span>

                    <Image
                      src="/google.png"
                      alt="google"
                      width={30}
                      height={30}
                      className="bg-transparent"
                    />
                  </Button>
                </form>
              )}
              <Button
                asChild
                type="submit"
                className="bg-primary-dark text-white hover:text-primary hover:bg-secondary"
              >
                <Link href="#categories">See our categories</Link>
              </Button>
            </div>
          </div>
          <div className=" hidden lg:flex lg:items-center lg:gap-3">
            <div className="flex flex-col gap-3">
              <div className="relative w-[200px] h-[300px]">
                <Image
                  src="/brown-1s.png"
                  alt="main-brown"
                  className="rounded-lg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="relative w-[200px] h-[300px]">
                <Image
                  src="/brown-2.jpeg"
                  alt="main-brown"
                  className="rounded-lg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="hidden xl:block  relative w-[400px] h-[612px]">
              <Image
                src="/main-brown.jpg"
                alt="main-brown"
                className="rounded-lg"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <Link href="#categories" scroll={true}>
          <ArrowDownCircle className="size-11 absolute left-1/2 -translate-x-1/2 bottom-3 animate-pulse text-secondary cursor-pointer" />
        </Link>
      </section>
      <section
        className="padding_section padding_content bg-secondary min-h-screen"
        id="categories"
      >
        <div className="grid lg:grid-cols-[repeat(3,minmax(300px,1fr))] md:grid-cols-[repeat(2,minmax(300px,1fr))] sm:grid-cols-[repeat(1,minmax(250px,1fr)) gap-4">
          <SectionCard
            image="/men_clothes.jpeg"
            category="clothes"
            subCategory="men"
          />
          <SectionCard
            image="/women_clothes.jpg"
            category="clothes"
            subCategory="women"
          />
          <SectionCard
            image="/kids_clothes_2.jpg"
            category="clothes"
            subCategory="kids"
          />
          <SectionCard
            image="/sports_men.jpg"
            category="sports"
            subCategory="men"
          />
          <SectionCard
            image="/sports_women.png"
            category="sports"
            subCategory="women"
          />
          <SectionCard
            image="/sports_kids_3.jpeg"
            category="sports"
            subCategory="kids"
          />
        </div>
      </section>
    </>
  );
}
