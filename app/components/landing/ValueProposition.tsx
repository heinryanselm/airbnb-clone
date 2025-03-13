"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../Container";
import {
  MdLocationOn,
  MdSecurity,
  MdOutlineSearchOff,
  MdPayment,
} from "react-icons/md";

// Accordion components
const AccordionItem = ({
  title,
  children,
  icon: Icon,
  isOpen,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  icon: any;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
            <Icon size={20} />
          </div>
          <span className="font-semibold">{title}</span>
        </div>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>

      <div
        className={`mt-2 pl-14 pr-4 text-neutral-600 transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const ValueProposition: React.FC = () => {
  const [openItem, setOpenItem] = useState(0);

  const toggleItem = (index: number) => {
    setOpenItem(index === openItem ? -1 : index);
  };

  const accordionItems = [
    {
      icon: MdLocationOn,
      title: "Best locations across the UK",
      content:
        "We provide access to properties in the most desirable locations, from city apartments to countryside homes.",
    },
    {
      icon: MdSecurity,
      title: "Secure and trusted platform",
      content:
        "Our platform ensures all listings are verified and secure, giving you peace of mind during your property search.",
    },
    {
      icon: MdOutlineSearchOff,
      title: "No search limitations",
      content:
        "Unlike other platforms, we don't restrict your search capabilities. Find exactly what you're looking for.",
    },
    {
      icon: MdPayment,
      title: "Transparent pricing",
      content:
        "All our listings feature clear, transparent pricing with no hidden fees or surprises.",
    },
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Left side with image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 relative h-[450px] w-full"
          >
            <div className="overflow-hidden rounded-lg h-full shadow-lg">
              <Image
                src="/images/value-image.png"
                alt="Value we give to you"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right side with accordion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="mb-8">
              <span className="text-rose-500 font-semibold">Our Value</span>
              <h2 className="text-3xl font-bold mt-2">Value We Give to You</h2>
              <p className="text-neutral-600 mt-4">
                We are always ready to help by providing the best service for
                you. We believe a good property can make your life better.
              </p>
            </div>

            <div>
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  isOpen={openItem === index}
                  onClick={() => toggleItem(index)}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ValueProposition;
