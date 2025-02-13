"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Drawer } from "../DesignSystem/DesignSystem";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const tabItems = ["Notes", "About", "Account"];

  const selectedTab =
    pathname == "/"
      ? "Notes"
      : pathname == "/about"
        ? "About"
        : pathname == "/account"
          ? "Account"
          : "";

  const DrawerList = (
    <div
      style={{ width: 250 }}
      className="h-full flex flex-col gap-3 px-6 py-7 justify-start items-center"
      onClick={() => setOpen(false)}
    >
      {["Notes", "About", "Account"].map((text, index) => (
        <Link
          href={`/${text === "Notes" ? "" : text.toLowerCase()}`}
          key={index}
          className="text-xl py-4"
        >
          {text}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
      <div className="w-full flex justify-between h-full items-center max-w-[1320px]">
        <Link href="/" className="text-3xl font-semibold">
          Keep Notes
        </Link>
        <span className="hidden md:flex gap-6">
          <div className="flex gap-4">
            {tabItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={`/${item === "Notes" ? "" : item.toLowerCase()}`}
                  className={`py-2 px-4 font-semibold hover:border-b-2 hover:border-gray-500 transition-colors ${
                    selectedTab === item ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </span>
        <span className="block md:hidden" onClick={() => setOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={26}
            height={26}
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </span>
      </div>
    </>
  );
}
