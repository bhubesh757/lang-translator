import { Button } from "@/components/ui/button";
import Link from "@/node_modules/next/link";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Home() {

  const {userId} = auth();

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
  }/translate`;

  return (
    <main className="flex flex-col items-center justify-center p-10" >
      <h1 className="text-3xl lg:text-6xl text-center pb-10 mb-5 font-light">
        Understand your world and communicate across languages
      </h1>{" "}
      <Image
        src="https://geekflare.com/cdn-cgi/image/width=728,quality=90,gravity=auto,sharpen=1,metadata=none,format=auto,onerror=redirect/wp-content/uploads/2022/12/Online-Translator.png"
        alt="logo"
        width={700}
        height={700}
      />
      {userId ? (
        <Link
          href="/translate"
          className="bg-blue-500 hover:bg-blue-600 w-full mt-10 lg:w-fit p-5 rounded-md text-white text-center cursor-pointer"
        >
          Translate Now
        </Link>
      ) : (
        <Button className="bg-blue-500 hover:bg-blue-600 w-full mt-10 lg:w-fit p-5">
          <SignInButton afterSignInUrl={url} mode="modal">
            Sign In to Get Translating
          </SignInButton>
        </Button>
      )}
    </main>
  );
}
