"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  icon?: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  icon,
}) => {
  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <span className="font-semibold">{title}</span>
        </div>
        <span className="transform transition-transform duration-300">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: Array<{
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  singleOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  singleOpen = true,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    if (singleOpen) {
      setOpenIndices(openIndices.includes(index) ? [] : [index]);
    } else {
      setOpenIndices(
        openIndices.includes(index)
          ? openIndices.filter((i) => i !== index)
          : [...openIndices, index]
      );
    }
  };

  return (
    <div className="divide-y divide-neutral-200">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onToggle={() => toggleItem(index)}
          icon={item.icon}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
