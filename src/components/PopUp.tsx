type PopUpProps = {
  handleClose: () => void;
  type: "success" | "error";
  show: boolean;
};

const PopUp = ({ handleClose, type, show }: PopUpProps) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const message =
    type === "success" ? "Listing created!" : "Error creating listing!";

  return (
    <>
      {show && (
        <div
          className={`${bgColor} h-30 fixed  left-1/2 top-0 z-50 flex  w-full max-w-screen-sm -translate-x-1/2 transform flex-col items-center justify-center rounded-md p-4 text-white`}
        >
          <p className="flex-1 text-lg">{message}</p>
          <button
            className="ml-2 font-bold uppercase text-white"
            onClick={() => handleClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PopUp;
