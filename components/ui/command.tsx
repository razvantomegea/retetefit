'use client';

import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-surface text-text-primary',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {
  children: React.ReactNode;
  open: boolean;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const CommandDialog = ({ children, open, ...props }: CommandDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? {} : modalVariants;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg h-full w-full sm:h-auto sm:max-w-2xl sm:rounded-lg rounded-none">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="command-content"
              variants={variants}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              animate={prefersReducedMotion ? undefined : 'visible'}
              exit={prefersReducedMotion ? undefined : 'exit'}
              className="h-full"
            >
              <Command className="h-full *:[[cmdk-group-heading]]:px-2 *:[[cmdk-group-heading]]:font-medium *:[[cmdk-group-heading]]:text-text-secondary [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 *:[[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 *:[[cmdk-input]]:h-12 *:[[cmdk-item]]:px-2 *:[[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                {children}
              </Command>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <motion.div
      className="flex items-center border-b px-3 relative"
      cmdk-input-wrapper=""
      animate={
        isFocused
          ? {
              borderColor: 'rgb(34, 197, 94)',
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={
          isFocused
            ? {
                scale: 1,
                opacity: 1,
                rotate: 0,
              }
            : {
                scale: 1,
                opacity: 0.5,
                rotate: 0,
              }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Search className="mr-2 h-4 w-4 shrink-0" />
      </motion.div>
      <CommandPrimitive.Input
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {isFocused && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
          layoutId="input-focus"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </motion.div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'max-h-[calc(100vh-8rem)] sm:max-h-[400px] overflow-y-auto overflow-x-hidden',
      className
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: [0.95, 1.02, 1],
      }}
      transition={{
        duration: 0.4,
        delay: 0.2,
        scale: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2,
          ease: 'easeInOut',
        },
      }}
    >
      {props.children}
    </motion.div>
  </CommandPrimitive.Empty>
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-text-primary *:[[cmdk-group-heading]]:px-2 *:[[cmdk-group-heading]]:py-1.5 *:[[cmdk-group-heading]]:text-xs *:[[cmdk-group-heading]]:font-medium *:[[cmdk-group-heading]]:text-text-secondary',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
};

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isHovered
          ? {
              x: 2,
              scale: 1.01,
            }
          : {
              x: 0,
              scale: 1,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      <CommandPrimitive.Item
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors aria-selected:bg-surface-elevated aria-selected:text-text-primary data-disabled:pointer-events-none data-disabled:opacity-50',
          'hover:bg-surface-elevated',
          className
        )}
        {...props}
      >
        {isHovered && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"
            layoutId="item-hover"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <div className="flex-1">{props.children}</div>
      </CommandPrimitive.Item>
    </motion.div>
  );
});

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-text-secondary', className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
