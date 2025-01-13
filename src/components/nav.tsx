import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="bg-[#111827] ">
      {/* max width works when the a container has some constrained width. */}
      <div className="flex flex-col md:flex-row p-6  items-center md:justify-between  gap-4 max-w-7xl mx-auto md:px-14 ">
        <Link href="/" className="font-bold text-xl text-white">
          True Feedback
        </Link>
        <Button className="bg-white text-black hover:bg-slate-50 p-5" asChild>
          <Link href={"/singin"}>Login</Link>
        </Button>
      </div>
    </nav>
  );
}
