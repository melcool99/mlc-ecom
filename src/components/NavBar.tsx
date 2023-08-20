import React from "react";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed left-0 top-0 z-20 w-full  bg-black">
      <ul className="flex w-full flex-row  items-center   p-4 font-medium">
        {isSignedIn ? (
          <>
            <li className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500">
              <Link href="/" aria-current="page">
                Home
              </Link>
            </li>
            <li className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500">
              <Link href="/sell-an-item" aria-current="page">
                Sell Item
              </Link>
            </li>
            <li className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500">
              <Link href="/offers" aria-current="page">
                Offers
              </Link>
            </li>
            <li className="md:flex-grow-1 ml-auto justify-self-end">
              <UserButton />
            </li>
          </>
        ) : (
          <li>
            <SignInButton mode="modal">
              <button className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500">
                Sign in
              </button>
            </SignInButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
