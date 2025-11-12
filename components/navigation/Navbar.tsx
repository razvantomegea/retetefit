'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useScroll } from '@/hooks/useScroll';
import { cn } from '@/lib/utils';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';
import { SearchDialog } from './SearchDialog';

export function Navbar() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-surface/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavLinks />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <div className="hidden lg:block">
              <SearchDialog />
            </div>

            {/* Desktop Only: Language & Theme */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile: Hamburger Menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
