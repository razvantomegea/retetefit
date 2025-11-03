'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface SearchDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SearchDialog({ open: controlledOpen, onOpenChange }: SearchDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'ro';
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) {
        onOpenChange(value);
      } else {
        setInternalOpen(value);
      }
    },
    [onOpenChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    },
    [open, setOpen]
  );

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 100);

      return () => clearTimeout(timeout as NodeJS.Timeout);
    }
  }, [open, inputRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const dialogClassName =
    mounted && resolvedTheme === 'dark'
      ? 'overflow-hidden p-0 shadow-2xl h-auto items-center sm:max-w-2xl bg-zinc-900/60 backdrop-blur-[64px] border border-white/10'
      : 'overflow-hidden p-0 shadow-2xl h-auto items-center sm:max-w-2xl bg-white backdrop-blur-none border border-border';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full flex items-center gap-3 text-left text-lg px-4 py-3 rounded-md hover:bg-surface-elevated transition-colors cursor-pointer text-text-primary font-medium"
        aria-label={t('search.title')}
      >
        <Search className="h-5 w-5 shrink-0" />
        <span>{t('search.title')}</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent open={open} className={dialogClassName}>
          <DialogTitle className="sr-only">{t('search.title')}</DialogTitle>
          <div className="p-6 w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Search className="h-5 w-5 text-text-secondary" />
                </motion.div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder={t('search.placeholder')}
                  className="flex-1 text-lg outline-none bg-transparent placeholder:text-text-secondary text-text-primary"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="mt-6 text-sm text-text-secondary"
              >
                {/* Desktop: Show Enter key hint */}
                <div className="hidden sm:flex items-center justify-between">
                  <span className="text-xs">{t('search.pressEnter')}</span>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs font-semibold text-text-primary bg-surface-elevated border border-border rounded">
                      Enter
                    </kbd>
                    <span className="text-xs">{t('search.toSearch')}</span>
                  </div>
                </div>
              </motion.div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
