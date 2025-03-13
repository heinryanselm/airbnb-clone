"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../Container";
import { MdCall, MdChatBubble, MdVideocam, MdEmail } from "react-icons/md";

const ContactItem = ({
  icon: Icon,
  title,
  subtitle,
  actionText,
}: {
  icon: any;
  title: string;
  subtitle: string;
  actionText: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg p-6 shadow-md border border-neutral-100 flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-neutral-500 text-sm">{subtitle}</p>
        </div>
      </div>
      <button className="mt-auto py-2 px-4 bg-neutral-100 hover:bg-rose-50 text-neutral-800 hover:text-rose-500 rounded-lg transition w-full text-center font-medium">
        {actionText}
      </button>
    </motion.div>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact-us" className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left side content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <span className="text-rose-500 font-semibold">Contact Us</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">Easy to Contact Us</h2>
            <p className="text-neutral-600 mb-8 max-w-lg">
              We&apos;re always ready to help by providing the best service
              for you. We believe a good property search can make your life
              better.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContactItem
                icon={MdCall}
                title="Call"
                subtitle="+44 (0) 123 456 7890"
                actionText="Call Now"
              />
              <ContactItem
                icon={MdChatBubble}
                title="Chat"
                subtitle="Live Chat Support"
                actionText="Chat Now"
              />
              <ContactItem
                icon={MdVideocam}
                title="Video Call"
                subtitle="Video Property Tours"
                actionText="Video Call Now"
              />
              <ContactItem
                icon={MdEmail}
                title="Email"
                subtitle="support@findmyproperty.com"
                actionText="Email Now"
              />
            </div>
          </motion.div>

          {/* Right side image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 relative h-[500px] w-full"
          >
            <div className="overflow-hidden rounded-lg h-full">
              <Image
                src="/images/contact-image.jpg"
                alt="Contact Us"
                fill
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

export default Contact;
