"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "../Container";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser} from "@/app/types"

interface GetStartedProps {
  currentUser?: SafeUser | null;
}

const GetStarted: React.FC<GetStartedProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onGetStarted = useCallback(() => {
    if (currentUser) {
      // If user is logged in, go to listings
      router.push("/listings");
    } else {
      // If not logged in, show register modal
      registerModal.onOpen();
    }
  }, [currentUser, router, registerModal]);

  return (
    <section className="py-16 bg-rose-500 text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 p-10 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">
            Get Started with Find My Property
          </h2>
          <p className="text-rose-100 mb-8 max-w-lg mx-auto">
            Subscribe and find super attractive price quotes from us. Find your
            perfect property soon!
          </p>
          <Button
            label={currentUser ? "Browse Properties" : "Get Started"}
            onClick={onGetStarted}
            className="bg-white text-rose-600 hover:bg-rose-50 py-3 px-8 text-lg"
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default GetStarted;
