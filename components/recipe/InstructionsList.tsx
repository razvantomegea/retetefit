'use client';

import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface InstructionsListProps {
  instructions: string[];
  className?: string;
}

export function InstructionsList({ instructions, className }: InstructionsListProps) {
  const t = useTranslations('recipes');
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <h2 className="mb-5 text-2xl font-bold text-text-primary">{t('instructions')}</h2>

      <motion.ol
        className="list-none space-y-5 pl-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {instructions.map((instruction, index) => (
          <motion.li key={index} variants={itemVariants} className="flex gap-3">
            <span className="font-bold text-green-500 text-lg shrink-0">{index + 1}.</span>
            <span className="text-base leading-relaxed text-text-primary">{instruction}</span>
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
}
