import React from "react";

import type { NextPage } from "next";
import { api } from "~/utils/api";
import type { Listing } from "@prisma/client";
import ProductCard from "~/components/ProductCard";

const Offers: NextPage = () => {
  // get message list for each listing with api trpc//
  const messages = api.listings.getMessage.useQuery();

  return (
    <div className=" container min-h-screen  flex-col p-5 text-gray-50">
      <h3 className="text-2xl">Your Offers</h3>
      <table className="mt-5 w-full table-auto">
        <thead className="bg-gray-400">
          <tr>
            <th className="px-4 py-2 text-start">Listing ID</th>
            <th className="px-4 py-2 text-start">From User</th>
            <th className="px-4 py-2 text-start">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages?.data?.map((message) => (
            <tr key={message.id}>
              <td className="border px-4 py-2">{message.fromUserName}</td>
              <td className="border px-4 py-2">{message.listingId}</td>
              <td className="border px-4 py-2">{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
