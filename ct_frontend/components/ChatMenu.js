import { BsPlusCircle } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import React from "react";
import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import { FiHeadphones } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import Link from "next/link";
import "@szhsin/react-menu/dist/index.css";
import "tailwindcss/tailwind.css";
import Router from "next/router";

export default function ChatMenu({ username }) {
  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>
          {open ? (
            <IoMdCloseCircleOutline size={32} className="text-red-700" />
          ) : (
            <BsPlusCircle size={29} className="text-purple-700" />
          )}
        </MenuButton>
      )}
      direction="top"
      menuStyle={{ backgroundColor: "transparent" }}
      menuClassName={"!w-fit !min-w-[0px]"}
      align="center"
      viewScroll="auto"
      className="space-y-2"
    >
      <MenuItem
        className="transition ease-in-out delay-150 duration-300 text-white bg-transparent py-2"
        onClick={() => Router.push(`/canvas/${username}`)}
      >
        {({ hover, active }) =>
          active ? (
            "White Board"
          ) : hover ? (
            "White Board"
          ) : (
            <FaEdit size={30} className="text-purple-700" />
          )
        }
      </MenuItem>

      <MenuItem
        className="transition ease-in-out delay-150 duration-300 text-white bg-transparent py-2"
        onClick={() => Router.push(`/playground/${username}`)}
      >
        {({ hover, active }) =>
          active ? (
            "Voice Chat"
          ) : hover ? (
            "Voice Chat"
          ) : (
            <FiHeadphones size={30} className="text-purple-700" />
          )
        }
      </MenuItem>

      <MenuItem
        className="transition ease-in-out delay-150 duration-300 text-white bg-transparent py-2"
        onClick={() => Router.push(`/playground/${username}`)}
      >
        {({ hover, active }) =>
          active ? (
            "Invite"
          ) : hover ? (
            "Invite"
          ) : (
            <BiShareAlt size={30} className="text-purple-700" />
          )
        }
      </MenuItem>
    </Menu>
  );
}
