"use client";
import { useState, useEffect } from "react";

import { getCookies } from "../action";
import moment from "moment";
import dynamic from "next/dynamic";

const NotesLayout = dynamic(
  () => import("@/components/NotesLayout/NotesLayout"),
);

import { StoreProvider } from "@/redux/StoreProvder";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    handleCookies();
  }, []);

  const handleCookies = async () => {
    const cookie = await getCookies("username");
    if (cookie?.value) {
      setUsername(cookie.value);
    }
  };

  return (
    <div className="w-full my-3">
      <span className="text-4xl font-bold text-teal-900">
        {parseInt(moment().format("HH")) < 12
          ? `Good Morning ${username}!`
          : parseInt(moment().format("HH")) < 17
            ? `Good Afternoon ${username}!`
            : `Good Evening ${username}!`}
      </span>
      <StoreProvider>
        <div className="w-full mt-10">
          <NotesLayout />
        </div>
      </StoreProvider>
    </div>
  );
}
