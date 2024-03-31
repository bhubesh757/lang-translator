import React from 'react'
import { auth } from '@clerk/nextjs/server'
import Link from '@/node_modules/next/link';
import Image from '@/node_modules/next/image';
import { SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
    // server component
    const {userId} = auth();

    const url = `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.VERCEL_URL
      }/translate`;

  return (
    <header className='flex justify-between px-8 border-b mb-5'>
    <div className= ' flex items-center h-20 overflow-hidden '>
        <Link href={'/'}>
            <Image 
            src = "https://pbs.twimg.com/media/GJsWVjlagAAelec?format=png&name=900x900"
            alt = "logo" 
            width = {200}
            height = {100}
            className = "object-contain h-32 cursor-pointer"
            >
            </Image>
        </Link>
        
    </div>
    {/* // Ternary operator , cheching for loggedin or not loggedin */}
    {userId ? (
            <div className='relative flex items-center ' >
                <UserButton></UserButton>
            </div>
        ) : (
            <SignInButton afterSignInUrl = {url} mode = "modal" ></SignInButton>
        )}

</header>
  )
}

export default Header