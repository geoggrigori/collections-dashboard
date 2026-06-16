interface Props {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}

export function MetricCard({ label, value, hint, accent }: Props) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-violet-300 bg-violet-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p
        className={`mt-1 text-2xl font-semibold tracking-tight ${
          accent ? "text-violet-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
