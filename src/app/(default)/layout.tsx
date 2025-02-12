import Link from "next/link";
import { Breadcrumbs } from "@mui/material";
import NavBar from "@/components/NavBar/NavBar";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="gap-8 font-[family-name:var(--font-geist-sans)] h-screen w-screen flex flex-col">
      <nav className="h-[100px] flex items-center justify-center bg-blue-300 px-8 ">
        <NavBar />
      </nav>
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-[1320px] px-8">
        <div className="w-full justify-start">
          <Breadcrumbs maxItems={2}>
            <Link href={"/"}>Home</Link>
          </Breadcrumbs>
        </div>
        <div>{children}</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center  max-w-[1320px]"></footer>
    </div>
  );
}
