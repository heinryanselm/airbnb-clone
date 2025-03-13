"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import CountUp from "react-countup";
import Container from "../Container";
import Button from "../Button";
import Search from "../navbar/Search";
import useSearchModal from "@/app/hooks/useSearchModal";
import { SafeUser } from "@/app/types"

interface HeroProps {
  currentUser?: SafeUser | null;
}

const Hero: React.FC<HeroProps> = ({ currentUser }) => {
  const router = useRouter();
  const searchModal = useSearchModal();

  const onSearchClick = useCallback(() => {
    searchModal.onOpen();
  }, [searchModal]);
  const browseListing = useCallback(() => {
    router.push("/listings");
  }, [router]);

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <Container>
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="relative">
              {/* Orange circle accent */}
              <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full bg-rose-500 opacity-20" />

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 relative z-10 text-gray-800">
                Discover the most
                <br />
                Suitable Property <br />
                Tailored to your needs
              </h1>
            </div>

            <div className="text-neutral-500 mb-8">
              <p>Find a variety of properties that suit you very easily</p>
              <p>Forget all difficulties in finding your ideal property</p>
            </div>

            {/* Advanced Search Bar */}
            <div className="w-full mb-8 p-4 shadow-md rounded-lg bg-white border border-neutral-200">
              <div className="font-semibold mb-2 text-neutral-800">
                Advanced Search
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1" onClick={onSearchClick}>
                  <button className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-md text-left text-neutral-500 hover:border-neutral-300 cursor-pointer">
                    <FaSearch className="inline mr-2" size={16} />
                    <span>Find your perfect property...</span>
                  </button>
                </div>
                <div className="flex items-stretch min-w-[120px]">
                  <Button label="Browse All" onClick={browseListing} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-between items-center mt-8">
              <div className="flex flex-col items-center mb-4">
                <span className="text-2xl font-bold">
                  <CountUp start={8800} end={9000} duration={4} />
                  <span>+</span>
                </span>
                <span className="text-neutral-500 text-sm">
                  Premium Listings
                </span>
              </div>

              <div className="flex flex-col items-center mb-4">
                <span className="text-2xl font-bold">
                  <CountUp start={1950} end={2000} duration={4} />
                  <span>+</span>
                </span>
                <span className="text-neutral-500 text-sm">Happy Clients</span>
              </div>

              <div className="flex flex-col items-center mb-4">
                <span className="text-2xl font-bold">
                  <CountUp end={28} />
                  <span>+</span>
                </span>
                <span className="text-neutral-500 text-sm">Award Winning</span>
              </div>
            </div>
          </motion.div>

          {/* Right side with image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative h-[450px] w-full"
          >
            <div className="overflow-hidden rounded-lg h-full">
              <Image
                src="/images/hero-image.png"
                alt="Luxury Property"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
