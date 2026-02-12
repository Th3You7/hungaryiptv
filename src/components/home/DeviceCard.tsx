import Image from 'next/image';
import { placeholders } from '@/constants/placeholders';

interface DeviceCardProps {
  name: string;
}

export function DeviceCard({ name }: DeviceCardProps) {
  const src = placeholders.device(name);
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-6">
      <div className="relative h-16 w-16">
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain"
          sizes="64px"
          unoptimized
        />
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}
