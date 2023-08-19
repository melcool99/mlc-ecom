/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import PopUp from "~/components/PopUp";
import { useRouter } from "next/router";

type FormData = {
  name: string;
  description: string;
  price: string;
};

const SellAnItem: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const createListing = api.listings.create.useMutation();

  const [popUpType, setPopUpType] = useState<"success" | "error">("success");
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setShowPopUp(false);
    router.push("/");
  };

  const onSubmit = (data: FormData) => {
    createListing
      .mutateAsync({ ...data, price: parseFloat(data.price) })
      .then(() => {
        reset();
        setPopUpType("success");
        setShowPopUp(true);
      })
      .catch(() => {
        setPopUpType("error");
        setShowPopUp(true);
      });
  };

  return (
    <div className="mt-16 flex h-screen w-full   text-gray-50">
      <form
        className=" text-white-700 mx-auto my-5 h-max w-full max-w-md  flex-col rounded-lg bg-gray-600 p-4 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="mt-5 text-3xl font-bold ">Sell an item</h3>
        <div>
          <label htmlFor="name">Title</label>
          <input
            className="w-full rounded-lg bg-gray-500 p-2 focus:border-transparent focus:outline-0 focus:ring-2 focus:ring-green-600"
            type="text"
            id="title"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            className="w-full rounded-lg bg-gray-500 p-2 focus:border-transparent focus:outline-0 focus:ring-2 focus:ring-green-600"
            id="description"
            {...register("description", { required: true })}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            className="w-full rounded-lg bg-gray-500 p-2 focus:border-transparent focus:outline-0 focus:ring-2 focus:ring-green-600"
            type="number"
            id="price"
            {...register("price", { required: true })}
          />
        </div>
        <button
          className=" mt-6 w-full rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          type="submit"
        >
          Create
        </button>
      </form>
      <PopUp handleClose={handleClose} type={popUpType} show={showPopUp} />
    </div>
  );
};

export default SellAnItem;
