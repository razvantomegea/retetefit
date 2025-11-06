'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type ComponentPropsWithoutRef, forwardRef, type HTMLAttributes } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const Sheet = DialogPrimitive.Root;

const SheetTrigger = DialogPrimitive.Trigger;

const SheetClose = DialogPrimitive.Close;

const SheetPortal = DialogPrimitive.Portal;

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

const SheetOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <DialogPrimitive.Overlay ref={ref} className={className} {...props} asChild>
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
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-border data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  open?: boolean;
}

const sheetSideVariants = {
  right: {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  },
  left: {
    hidden: { x: '-100%' },
    visible: { x: 0 },
    exit: { x: '-100%' },
  },
  top: {
    hidden: { y: '-100%' },
    visible: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  },
};

const SheetContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, open, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = side ? sheetSideVariants[side] : sheetSideVariants.right;

  return (
    <SheetPortal forceMount>
      <AnimatePresence>
        {open && <SheetOverlay key="sheet-overlay" />}
        {open && (
          <DialogPrimitive.Content ref={ref} asChild forceMount key="sheet-content" {...props}>
            <motion.div
              variants={prefersReducedMotion ? undefined : variants}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              animate={prefersReducedMotion ? undefined : 'visible'}
              exit={prefersReducedMotion ? undefined : 'exit'}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.4,
              }}
              className={cn(sheetVariants({ side }), className)}
            >
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        )}
      </AnimatePresence>
    </SheetPortal>
  );
});
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { showClose?: boolean }
>(({ className, showClose = false, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  >
    {children}
    {showClose && (
      <DialogPrimitive.Close className="rounded-sm opacity-70 transition-all hover:opacity-100 hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none flex items-center justify-center h-8 w-8 shrink-0">
        <motion.div
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <X className="h-4 w-4 text-text-primary" />
        </motion.div>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    )}
  </div>
));
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-text-primary', className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
