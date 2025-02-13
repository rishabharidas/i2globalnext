"use client";
// import Image from "next/image";

import { useState, useEffect } from "react";
import moment from "moment";

import NotesLayout from "@/components/NotesLayout/NotesLayout";
import { StoreProvider } from "@/redux/StoreProvder";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="));

    if (cookie) {
      setUsername(cookie.split("=")[1]);
    }
  }, []);

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
