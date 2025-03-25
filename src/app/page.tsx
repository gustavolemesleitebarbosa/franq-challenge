import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <nav className="flex flex-col gap-4">
        <Link className="text-blue-500" href="/item/1243">
          Item
        </Link>
        <Link className="text-blue-500" href="/login">
          Login
        </Link>
        <Link className="text-blue-500" href="/register">
          Register
        </Link>
      </nav>{" "}
    </div>
  );
}
