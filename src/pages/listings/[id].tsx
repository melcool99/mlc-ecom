/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */

import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

type FormData = {
  message: string;
};

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isSignedIn } = useUser();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const sendMessage = api.listings.sendMessage.useMutation();
  const listing = api.listings.get.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const handleFormSubmit = (data: FormData) => {
    sendMessage.mutateAsync({
      message: data.message,
      listingId: listing?.data?.id as string,
    });
  };

  if (!listing) {
    return <div>Loading...</div>;
  }
  return (
    <div className="text  mt-20 flex max-w-7xl flex-col items-center justify-center px-4 py-12 text-gray-50 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
      <div className="mb-8 md:mb-0 md:w-1/2">
        <Image
          src={`https://source.unsplash.com/random/?${listing?.data?.name}`}
          alt={listing?.data?.name ?? "Product Image"}
          width={500}
          height={300}
          objectFit="contain"
        />
      </div>
      <div className=" flex h-full  w-full flex-col px-4 text-gray-50 md:w-1/2">
        <h1 className="mb-4  min-h-full w-full text-3xl font-bold text-gray-50">
          {listing?.data?.name}
        </h1>
        <p className="mb-4 h-20 w-full text-lg ">
          {listing?.data?.description}
        </p>
        <p className=" h-full w-full text-lg font-bold">
          ${listing?.data?.price}
        </p>
        <button className="mt-12 h-full w-full rounded-lg bg-gray-700 px-4 py-2 font-bold text-white hover:bg-black sm:w-1/2 md:w-2/3">
          Add to Cart
        </button>
        {isSignedIn && (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
            <label htmlFor="message" className="mb-2 block text-lg font-bold">
              Message:
            </label>
            <textarea
              id="message"
              {...register("message", { required: true })}
              className="focus:shadow-outline h-32 w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4  w-full rounded-lg bg-gray-700 px-4 py-2 font-bold text-white hover:bg-black sm:w-1/2 md:w-2/3"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
