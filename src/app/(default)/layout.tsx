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
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-[1320px] px-8">
        <div className="w-full justify-start flex gap-2 text-gray-500">
          <Link href={"/"}>Home</Link>
          <span>/</span>
        </div>
        <div>{children}</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center  max-w-[1320px]"></footer>
    </div>
  );
}
