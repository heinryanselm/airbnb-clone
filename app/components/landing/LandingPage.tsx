"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Hero from "./Hero";
import Companies from "./Companies";
import FeaturedListings from "./FeaturedListings";
import ValueProposition from "./ValueProposition";
import Contact from "./Contact";
import GetStarted from "./GetStarted";
import Container from "../Container";
import { SafeUser } from "@/app/types";

interface LandingPageProps {
  currentUser?: SafeUser | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ currentUser }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* White gradient overlay similar to Website.jsx */}
      <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-white/80 to-transparent z-[1]" />

      <Hero currentUser={currentUser} />
      <Companies />
      <FeaturedListings currentUser={currentUser} />
      <ValueProposition />
      <Contact />
      <GetStarted currentUser={currentUser} />
    </div>
  );
};

export default LandingPage;
