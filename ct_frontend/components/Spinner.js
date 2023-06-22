import { ImSpinner3 } from "react-icons/im";

export default function Spinner() {
  return (
    <>
      <div className=" absolute inset-0 bg-black bg-opacity-40 z-20 ">
        <div className="flex justify-center items-center w-full h-full">
          <ImSpinner3 className="animate-spin text-white opacity-100 text-5xl" />
        </div>
      </div>
    </>
  );
}
