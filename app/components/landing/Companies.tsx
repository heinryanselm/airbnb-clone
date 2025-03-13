"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../Container";

const Companies: React.FC = () => {
  // Animation variants for company logos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 bg-neutral-50">
      <Container>
        <motion.div
          className="flex flex-wrap justify-around items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { name: "Company 1", src: "/images/companies/company1.png" },
            { name: "Company 2", src: "/images/companies/company2.png" },
            { name: "Company 3", src: "/images/companies/company3.png" },
            { name: "Company 4", src: "/images/companies/company4.png" },
          ].map((company, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="h-12 w-32 relative grayscale hover:grayscale-0 transition opacity-80 hover:opacity-100">
                <Image
                  src={company.src}
                  alt={company.name}
                  width={130}
                  height={50}
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Companies;
