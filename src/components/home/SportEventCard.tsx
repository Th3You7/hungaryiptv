import Image from 'next/image';
import { placeholders } from '@/constants/placeholders';

interface SportEventCardProps {
  name: string;
}

export function SportEventCard({ name }: SportEventCardProps) {
  const src = placeholders.sport(name);
  return (
    <div className="relative h-32 w-56 shrink-0 overflow-hidden rounded-lg bg-surface md:h-40 md:w-72">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 224px, 288px"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="absolute bottom-2 left-2 font-heading text-lg font-bold text-white">
        {name}
      </span>
    </div>
  );
}
