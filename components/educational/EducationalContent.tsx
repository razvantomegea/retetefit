'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { enhanceAnchorProps } from '@/lib/external-links';

interface EducationalContentProps {
  content: string;
}

export function EducationalContent({ content }: EducationalContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="mx-auto max-w-4xl"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="text-lg leading-relaxed text-text-secondary mb-6" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol
                className="list-decimal list-inside space-y-2 mb-6 text-text-secondary"
                {...props}
              />
            ),
            li: ({ ...props }) => <li className="text-lg leading-relaxed" {...props} />,
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-green-500 dark:border-green-400 pl-4 italic my-6 text-text-secondary"
                {...props}
              />
            ),
            a: ({ ...props }) => {
              const enhancedProps = enhanceAnchorProps(props);

              return (
                <a
                  className="text-green-600 dark:text-green-400 hover:underline font-medium"
                  {...enhancedProps}
                />
              );
            },
            strong: ({ ...props }) => <strong className="font-bold text-text-primary" {...props} />,
            em: ({ ...props }) => <em className="italic" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
