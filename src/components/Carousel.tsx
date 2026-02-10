'use client';

import { useRef } from 'react';

interface CarouselProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Carousel({ children, title, subtitle, className = '' }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={`py-8 md:py-12 ${className}`}>
      {title && (
        <h2 className={subtitle ? 'mb-2 font-heading text-2xl font-bold text-foreground md:text-3xl' : 'mb-6 font-heading text-2xl font-bold text-foreground md:text-3xl'}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mb-6 text-muted">{subtitle}</p>
      )}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 py-2 scrollbar-hide md:px-8 [scroll-snap-type:x_mandatory] [&>*]:shrink-0 [&>*]:scroll-snap-align-start"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-surface-elevated p-2 text-foreground shadow-lg transition-colors hover:bg-primary md:block"
          aria-label="Scroll left"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-surface-elevated p-2 text-foreground shadow-lg transition-colors hover:bg-primary md:block"
          aria-label="Scroll right"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
