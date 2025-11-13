'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface GalleryProps {
  mainImage: string;
  mainImageAlt: string;
  galleryImages?: string[];
  className?: string;
}

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const imageVariants = {
  initial: { opacity: 0.6, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export function Gallery({ mainImage, mainImageAlt, galleryImages, className }: GalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  const images = useMemo(() => {
    const extras = galleryImages?.filter(Boolean) ?? [];
    return [mainImage, ...extras];
  }, [mainImage, galleryImages]);

  const activeImage = images[activeIndex] ?? mainImage;

  useEffect(() => {
    startTransition(() => {
      setPortalElement(document.body);
    });
  }, []);

  const handleThumbnailClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handlePrevious = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(1);
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleToggleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleNext, handlePrevious]);

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
      };

  const mainImageVariants = useMemo(
    () => ({
      initial: (dir: number) => ({
        opacity: 0,
        x: prefersReducedMotion ? 0 : dir * 24,
        scale: prefersReducedMotion ? 1 : 0.98,
      }),
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.198, ease: [0.4, 0, 0.2, 1] as const },
      },
      exit: (dir: number) => ({
        opacity: 0,
        x: prefersReducedMotion ? 0 : dir * -24,
        scale: prefersReducedMotion ? 1 : 0.98,
        transition: { duration: 0.144, ease: [0.4, 0, 0.2, 1] as const },
      }),
    }),
    [prefersReducedMotion]
  );

  const fullscreenImageVariants = useMemo(
    () => ({
      initial: (dir: number) => ({
        opacity: 0,
        x: prefersReducedMotion ? 0 : dir * 60,
        scale: 0.98,
      }),
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.234, ease: [0.4, 0, 0.2, 1] as const },
      },
      exit: (dir: number) => ({
        opacity: 0,
        x: prefersReducedMotion ? 0 : dir * -60,
        scale: 0.98,
        transition: { duration: 0.162, ease: [0.4, 0, 0.2, 1] as const },
      }),
    }),
    [prefersReducedMotion]
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <motion.div
        className="relative aspect-video lg:aspect-4/3 w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-lg dark:bg-zinc-800"
        {...motionProps}
      >
        <motion.button
          type="button"
          className="relative block h-full w-full cursor-zoom-in overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={handleToggleFullscreen}
          aria-label="Open image gallery fullscreen"
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.015,
                }
          }
          whileTap={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 0.985,
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }
          }
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeImage}
              className="relative h-full w-full"
              custom={direction || 1}
              variants={mainImageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={activeImage}
                alt={mainImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {images.length > 1 && (
        <div className="w-full max-w-[90vw] lg:max-w-full flex gap-2 lg:gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              type="button"
              key={image}
              className={cn(
                'relative aspect-square w-16 min-w-16 lg:w-20 lg:min-w-20 overflow-hidden rounded-xl border bg-zinc-200 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-zinc-800',
                index === activeIndex
                  ? 'border-primary shadow-lg'
                  : 'border-zinc-200 dark:border-zinc-700'
              )}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <Image src={image} alt={`${mainImageAlt} thumbnail`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {portalElement &&
        createPortal(
          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 lg:p-4"
                initial={prefersReducedMotion ? undefined : 'initial'}
                animate={prefersReducedMotion ? undefined : 'animate'}
                exit={prefersReducedMotion ? undefined : 'exit'}
                variants={prefersReducedMotion ? undefined : backdropVariants}
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  className="relative flex h-full w-full items-center justify-center lg:max-h-[90vh] lg:max-w-5xl"
                  initial={prefersReducedMotion ? undefined : 'initial'}
                  animate={prefersReducedMotion ? undefined : 'animate'}
                  exit={prefersReducedMotion ? undefined : 'exit'}
                  variants={prefersReducedMotion ? undefined : imageVariants}
                >
                  <button
                    type="button"
                    className="absolute z-10 right-3 top-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={handleCloseFullscreen}
                    aria-label="Close gallery"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={handlePrevious}
                        aria-label="View previous image"
                      >
                        <ArrowLeft className="h-6 w-6" />
                      </button>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={handleNext}
                        aria-label="View next image"
                      >
                        <ArrowRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeImage}
                      className="relative h-full w-full"
                      custom={direction || 1}
                      variants={fullscreenImageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Image
                        src={activeImage}
                        alt={mainImageAlt}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalElement
        )}
    </div>
  );
}
