import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import Link from "next/link";
import NavBar from "@/components/NavBar/NavBar";

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("loggedin");
  const headersList = await headers();
  const referer = headersList.get("referer");
  const isComingFromLogin = referer?.includes("/signin");

  if (!cookie) {
    redirect("/signin");
  } else if (cookie?.value === "false" && !isComingFromLogin) {
    redirect("/signin");
  }
  return (
    <div className="gap-8 font-[family-name:var(--font-geist-sans)] h-screen w-screen flex flex-col">
      <nav className="h-[100px] flex items-center justify-center bg-blue-300 px-8 ">
        <NavBar />
      </nav>
      <main className="flex w-full flex-col px-8 justify-center items-center">
        <div className="w-full justify-start max-w-[1320px]">
          <Link href={"/"}>Home</Link>
          <span>/</span>
        </div>
        <div className="justify-start max-w-[1320px] w-full flex">
          {children}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center  max-w-[1320px]"></footer>
    </div>
  );
}
