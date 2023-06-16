import Link from "next/link";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import { VscCalendar } from "react-icons/vsc";
import { FaLaptopCode } from "react-icons/fa";
import { SiCodeforces, SiCodechef, SiLeetcode } from "react-icons/si";
import { RiTimeFill } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

export default function Card({ item, index, buttonVariants }) {
  const changeTZ = (time) => {
    let theDate = new Date(Date.parse(time));
    return theDate.toLocaleString();
  };

  const handleRemindMe = async (item) => {};

  return (
    <motion.div
      key={index}
      className="p-5 px-6 rounded-2xl border-offWhite border-opacity-20 border-[1px] my-4 "
      initial={{
        opacity: 0,
        translateX: index % 2 === 0 ? -50 : 50,
        translateY: -100,
      }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.2, delay: index * 0.15 }}
    >
      <div className="flex justify-start items-center py-2 text-2xl mb-3">
        <span className="text-indigo-700">
          {item.site === "CodeForces" && <SiCodeforces className="w-8 h-8" />}
          {item.site === "CodeChef" && <SiCodechef className="w-8 h-8" />}
          {item.site === "LeetCode" && <SiLeetcode className="w-8 h-8" />}
        </span>
        <h1 className="mx-3"> {item.name}</h1>
      </div>

      <div className="flex justify-start items-center mb-1">
        <h1 className="text-teal-500 text-lg">
          <span className="text-offWhite mx-2">Platform : </span> {item.site}
        </h1>
      </div>

      <div className="flex justify-start items-center mb-1">
        <span className="text-teal-500 mx-2 text-xl">
          <RiTimeFill />
        </span>
        <p className="my-3 text-sm opacity-75">
          Start time : {changeTZ(item.start_time)}
        </p>
      </div>
      <div className="flex justify-start items-center mb-1">
        <span className="text-teal-500 mx-2 text-xl">
          <RiTimeFill />
        </span>
        <p className="my-3 text-sm opacity-75">
          End time : {changeTZ(item.end_time)}
        </p>
      </div>
      <div className="inline-flex">
        <Link href={`${item.url}`}>
          <motion.button
            className="px-6 py-2 mt-6 mb-4 mr-4 bg-transparent border-[1px] ease-in-out border-indigo-600 text-offWhite hover:bg-indigo-600 rounded-md flex justify-center items-center text-xl"
            variants={buttonVariants}
            whileHover="hover"
          >
            Visit
            <span className="mx-2">
              <FaLaptopCode />
            </span>
          </motion.button>
        </Link>

        <motion.button
          className="px-6 py-2 mt-6 mb-4 bg-transparent border-[1px] ease-in-out border-indigo-600 text-offWhite hover:bg-indigo-600 rounded-md flex justify-center items-center text-xl"
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => handleRemindMe(item)}
        >
          Remind me
          <span className="mx-2">
            <VscCalendar />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
