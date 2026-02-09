import Image from 'next/image';
import { placeholders } from '@/constants/placeholders';

interface TestimonialCardProps {
  quote: string;
  name: string;
}

export function TestimonialCard({ quote, name }: TestimonialCardProps) {
  return (
    <article className="flex w-72 shrink-0 flex-col rounded-lg border border-surface-elevated bg-surface p-6">
      <p className="mb-4 flex-1 text-sm italic text-muted">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={placeholders.avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="48px"
            unoptimized
          />
        </div>
        <span className="font-medium text-foreground">{name}</span>
      </div>
    </article>
  );
}
