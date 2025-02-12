"use client";
// import Image from "next/image";

import NotesLayout from "@/components/NotesLayout/NotesLayout";
import { StoreProvider } from "@/redux/StoreProvder";

export default function Home() {
  return (
    <div className="w-100 my-3">
      <span className="text-4xl font-bold text-teal-900">
        Good Morning Name !
      </span>
      <StoreProvider>
        <div className="w-100 mt-10">
          <NotesLayout />
        </div>
      </StoreProvider>
    </div>
  );
}
