'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence,motion } from 'framer-motion';
import { X } from 'lucide-react';
import * as React from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <DialogPrimitive.Overlay ref={ref} asChild forceMount {...props}>
      <motion.div
        variants={prefersReducedMotion ? undefined : overlayVariants}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
        exit={prefersReducedMotion ? undefined : 'exit'}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 dark:bg-black/30 backdrop-blur-none dark:backdrop-blur-sm',
          className
        )}
      />
    </DialogPrimitive.Overlay>
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const contentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 300,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const mobileContentVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 30,
      stiffness: 300,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.25,
    },
  },
};

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  open?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, open, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const variants = isMobile ? mobileContentVariants : contentVariants;

  return (
    <DialogPortal forceMount>
      <AnimatePresence>
        {open && <DialogOverlay key="dialog-overlay" />}
        {open && (
          <DialogPrimitive.Content ref={ref} asChild forceMount key="dialog-content" {...props}>
            <motion.div
              variants={prefersReducedMotion ? undefined : variants}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              animate={prefersReducedMotion ? undefined : 'visible'}
              exit={prefersReducedMotion ? undefined : 'exit'}
              className={cn(
                'fixed z-50 grid gap-4 shadow-lg',
                'inset-0 sm:inset-auto sm:left-[50%] sm:top-[50%] sm:-translate-x-1/2 sm:-translate-y-1/2',
                'w-full sm:max-w-lg sm:rounded-lg',
                'p-6',
                className
              )}
            >
              {children}
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-all hover:opacity-100 hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none">
                <motion.div
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <X className="h-4 w-4 text-text-primary" />
                </motion.div>
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </motion.div>
          </DialogPrimitive.Content>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
