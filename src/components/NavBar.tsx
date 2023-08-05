import React from "react";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

const NavBar = () => (
  <nav className="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-green-900">
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <div className="flex md:order-2">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        id="navbar-sticky"
      >
        <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-green-900">
          <li>
            <a
              href="#"
              className="block rounded bg-green-700 py-2 pl-3 pr-4 text-white hover:text-green-300 md:bg-transparent md:p-0 md:text-green-700 md:dark:text-green-500 "
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <SignInButton>
              <button className="block rounded bg-green-700 py-2 pl-3 pr-4 text-white hover:text-green-300 md:bg-transparent md:p-0 md:text-green-700 md:dark:text-green-500">
                Sign in
              </button>
            </SignInButton>
          </li>
          <li>
            <SignOutButton>
              <button className="block rounded bg-green-700 py-2 pl-3 pr-4 text-white hover:text-green-300 md:bg-transparent md:p-0 md:text-green-700 md:dark:text-green-500">
                Sign out
              </button>
            </SignOutButton>
          </li>

          <li>
            <UserButton />
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
