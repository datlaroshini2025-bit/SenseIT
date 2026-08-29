type Props = { checked: boolean; onChange: (value: boolean) => void; label: string };

export function Toggle({ checked, onChange, label }: Props) {
  return (
    <button
      className={`toggle ${checked ? "on" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={`${label}: ${checked ? "on" : "off"}`}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}