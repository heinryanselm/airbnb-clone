"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSwiper, Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Container from "../Container";
import ListingCard from "../listings/ListingCard";
import { SafeUser } from "@/app/types";
import { Listing } from "@prisma/client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Navigation buttons component
const SlideButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 shadow-sm transition"
      >
        <FaChevronLeft size={16} />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 shadow-sm transition"
      >
        <FaChevronRight size={16} />
      </button>
    </div>
  );
};

interface FeaturedListingsProps {
  currentUser?: SafeUser | null;
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({ currentUser }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch featured listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings?featured=true");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <section id="featured-listings" className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-rose-500 font-semibold">Best Choices</span>
          <h2 className="text-3xl font-bold mt-2">Popular Properties</h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            <div className="absolute top-0 right-0 z-10">
              <SlideButtons />
            </div>

            {listings.slice(0, 8).map((listing) => (
              <SwiperSlide key={listing.id}>
                <ListingCard data={listing} currentUser={currentUser} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </section>
  );
};

export default FeaturedListings;
