import { AiOutlineCloseCircle } from "react-icons/ai";
export default function Loader() {
  return (
    <>
      <div className="">
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-20">
          <div className=" bg-offBlack p-5 rounded-2xl max-w-lg h-96 overflow-y-auto scrollbar">
            <div className="flex justify-end">
              <button className="text-3xl text-white">
                <AiOutlineCloseCircle />
              </button>
            </div>

            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      </div>
    </>
  );
}
