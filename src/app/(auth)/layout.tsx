export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] h-screen w-screen ">
      {children}
    </div>
  );
}
