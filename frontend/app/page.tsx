import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

import BrandLogo from "@/components/atoms/brand-logo";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div>
      <div className="mt-3 flex h-[48px] items-center justify-center border-border px-6">
        <div className="flex items-center">
          <BrandLogo />
        </div>
        <SignedIn>
          <SignOutButton>
            <Button variant={"outline"} className="ml-auto">
              Logout
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
      <div className="mt-12 px-4">
        <div className="hero-section py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome to VakilSahab.ai</h1>
          <p className="mb-10 text-xl text-muted-foreground">
            Your AI companion for instant legal insights and assistance.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="text-base">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/chatbot">
              <Button size="lg" className="text-base" type="button">
                Go to Chatbot
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
