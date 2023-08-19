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
            <li>
              <Link
                href="/"
                className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/sell-an-item"
                className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500"
                aria-current="page"
              >
                Sell Item
              </Link>
            </li>
            <li>
              <Link
                href="/offers"
                className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500"
                aria-current="page"
              >
                Offers
              </Link>
            </li>
            <li>
              <SignOutButton>
                <button className="block justify-self-end rounded bg-black py-2 pl-3 pr-4 text-white hover:text-orange-500">
                  Sign out
                </button>
              </SignOutButton>
            </li>
          </>
        ) : (
          <li>
            <SignInButton mode="modal">
              <button className="block rounded bg-black py-2 pl-3 pr-4 text-white hover:text-green-300 md:bg-transparent md:p-0 md:text-green-700 md:dark:text-green-500">
                Sign in
              </button>
            </SignInButton>
          </li>
        )}

        <li className="md:flex-grow-1 justify-self-end">
          <UserButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
