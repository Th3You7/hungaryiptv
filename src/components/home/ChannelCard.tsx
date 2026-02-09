import Image from 'next/image';
import { placeholders } from '@/constants/placeholders';

interface ChannelCardProps {
  name: string;
}

export function ChannelCard({ name }: ChannelCardProps) {
  const src = placeholders.channel(name);
  return (
    <div className="flex h-24 w-32 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg bg-surface">
      <div className="relative h-12 w-20">
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain"
          sizes="80px"
          unoptimized
        />
      </div>
      <span className="mt-1 truncate px-2 text-xs text-muted">{name}</span>
    </div>
  );
}
