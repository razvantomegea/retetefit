'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function Logo() {
  const params = useParams();
  const locale = params?.locale || 'ro';

  return (
    <Link href={`/${locale}`} className="flex items-center gap-3 group" aria-label="MainGain Home">
      <motion.div
        className="relative h-10 w-10 overflow-hidden rounded-lg transition-transform"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src="/logo.png"
          alt="MainGain logo"
          width={100}
          height={100}
          sizes="40px"
          className="h-full w-full object-contain"
          priority
        />
      </motion.div>
      <span className="font-bold text-xl text-text-primary">MainGain</span>
    </Link>
  );
}
