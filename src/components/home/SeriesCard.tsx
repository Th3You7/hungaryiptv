import Image from 'next/image';

interface SeriesCardProps {
  name: string;
  image: string;
}

export function SeriesCard({ name, image }: SeriesCardProps) {
  const src = `/images/series/${image}.webp`;
  return (
    <div className="relative w-[160px] shrink-0 overflow-hidden rounded-xl bg-surface aspect-[853/1280] min-[480px]:w-[200px] sm:w-[213px] md:w-[240px] lg:w-[256px]">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover object-center"
        sizes="(max-width: 479px) 160px, (max-width: 639px) 200px, (max-width: 767px) 213px, (max-width: 1023px) 240px, 256px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="absolute bottom-2 left-2 font-heading text-base font-bold text-white drop-shadow-md md:text-lg">
        {name}
      </span>
    </div>
  );
}
