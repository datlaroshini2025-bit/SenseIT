export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand" aria-label="Sense IT">
      <span className="brand-mark">@</span>
      {!compact && <span>Sense IT</span>}
    </div>
  );
}