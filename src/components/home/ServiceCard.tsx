interface ServiceCardProps {
  title: string;
  description: string;
}

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="rounded-lg border border-surface-elevated bg-surface p-6 transition-colors hover:border-primary/50">
      <h3 className="mb-3 font-heading text-xl font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </article>
  );
}
