'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FAQ({ title, subtitle, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-8 md:py-12">
      <h2 className="mb-2 font-heading text-2xl font-bold text-foreground md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mb-6 text-muted">{subtitle}</p>
      )}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-lg border transition-colors ${
              openIndex === index ? 'border-primary bg-surface' : 'border-surface-elevated bg-surface/50'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full min-h-[44px] items-center justify-between px-4 py-4 text-left"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-foreground">{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-muted transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="border-t border-surface-elevated px-4 py-4">
                <p className="text-sm text-muted">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
