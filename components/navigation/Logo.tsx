'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function Logo() {
  const params = useParams();
  const locale = params?.locale || 'ro';

  return (
    <Link href={`/${locale}`} className="flex items-center gap-2 group" aria-label="MainGain Home">
      <motion.div
        className="w-10 h-10 bg-green-500 dark:bg-green-400 rounded-lg flex items-center justify-center transition-transform"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-white dark:text-zinc-900 font-bold text-xl">M</span>
      </motion.div>
      <span className="font-bold text-xl text-text-primary hidden sm:block">MainGain</span>
    </Link>
  );
}
