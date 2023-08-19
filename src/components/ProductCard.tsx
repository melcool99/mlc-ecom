import { type Listing } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ listing }: { listing: Listing }) => {
  return (
    <div className="mx-4 my-2 flex flex-col items-center justify-center rounded-lg bg-white shadow-lg ">
      <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg ">
        <Image
          width={400}
          height={300}
          className="h-48 w-full object-cover"
          src={`https://source.unsplash.com/random/?${listing.name}`}
          alt="Product Image"
        />
        <div className="p-4">
          <h2 className="text-lg font-medium">{listing.name}</h2>
          <p>{listing.description}</p>
          <p className="text-gray-500">${listing.price}</p>
        </div>
        <div className="flex justify-end bg-gray-100 p-4">
          <button className="rounded-lg bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-900">
            <Link href={`listings/${listing.id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
