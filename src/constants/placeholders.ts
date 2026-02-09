// Placeholder image URLs - replace with actual images in public/images/
const BASE = 'https://placehold.co';

export const placeholders = {
  hero: `${BASE}/1920x800/141414/808080?text=IPTV`,
  channel: (name: string) => `${BASE}/120x80/1f1f1f/808080?text=${encodeURIComponent(name)}`,
  sport: (name: string) => `${BASE}/320x180/1f1f1f/808080?text=${encodeURIComponent(name)}`,
  device: (name: string) => `${BASE}/80x80/2d2d2d/808080?text=${encodeURIComponent(name)}`,
  avatar: `${BASE}/48x48/2d2d2d/808080?text=User`,
} as const;
