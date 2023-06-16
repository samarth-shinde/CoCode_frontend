import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrDocumentDownload } from "react-icons/gr";
import Link from "next/link";
import SearchGif from "../../public/search.gif";
import Image from "next/image";
import errorPng from "../../public/images/error.png";
import config from "../../config";
import Spinner from "../Spinner";

export default function Helper({ toggleFun, query }) {
  const [article, setArticle] = useState("");
  const [readMore, setReadMore] = useState("");
  const [errorNotify, setErrorNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${config.helpPortalURL}`, {
        query: query,
      })
      .then((res) => {
        setArticle(res.data.article);
        setReadMore(res.data.link);
        setIsLoading(false);
        setErrorNotify(false);
      })
      .catch((err) => {
        setErrorNotify(true);
        setIsLoading(false);
        console.log(err);
      });
  }, [query]);

  return (
    <>
      <div className="">
        {isLoading ? (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-20">
            <Spinner />
          </div>
        ) : (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-20">
            <div className=" bg-offBlack p-5 rounded-2xl max-w-lg h-96 overflow-y-auto scrollbar">
              <div className="flex justify-end">
                <button
                  className="text-3xl text-white"
                  onClick={() => {
                    toggleFun();
                  }}
                >
                  <AiOutlineCloseCircle />
                </button>
              </div>

              {errorNotify && (
                <div>
                  <div className=" flex justify-center">
                    <Image src={errorPng} width={200} height={200} />
                  </div>
                  <div className="flex justify-center">
                    <h1 className="text-2xl text-indigo-500 mt-5 mb-3">
                      Ohh Snap!! Can't find One..Sorry!!
                    </h1>
                  </div>
                </div>
              )}

              {article && (
                <>
                  <h1 className="text-2xl my-3" id="header-text">
                    Here's a help for you:
                  </h1>
                  <p>{article}</p>
                </>
              )}

              {!errorNotify && !article && (
                <div className="w-full flex justify-center items-center">
                  <div className="bg-white rounded-full h-[100px] w-[100px] p-5 flex justify-center items-center my-5">
                    <div>
                      <Image
                        src={SearchGif}
                        alt="search"
                        width={70}
                        height={70}
                      />
                    </div>
                  </div>
                </div>
              )}

              {readMore && (
                <Link href={readMore}>
                  <a className="text-xl text-blue-600">Read more</a>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .scrollbar::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        .scrollbar::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 3px;
        }

        .scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
