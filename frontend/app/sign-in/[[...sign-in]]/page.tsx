import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import BrandLogo from "@/components/atoms/brand-logo";

export default function Page() {
  return (
    <div>
      <div className="flex h-[48px] items-center justify-between border-border px-6">
        <Link href="/" className="text-inherit hover:no-underline">
          <BrandLogo />
        </Link>
      </div>
      <div className="mt-2 flex justify-center">
        <SignIn />
      </div>
    </div>
  );
}
