"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SecurityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-2 shadow-lg cursor-pointer w-full sm:w-auto"
      >
        <Image
          src="/images/comodo.png"
          alt="Comodo Secure"
          width={120}
          height={40}
          className="min-w-[80px] sm:min-w-[100px]"
        />
      </motion.div>
    </motion.div>
  );
}
