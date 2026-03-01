import { LucideIcon } from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

interface Props {
  stats: StatItem[];
}

export default function StatsWidget({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, trend, color = 'text-violet-600' }) => (
        <div
          key={label}
          className="bg-white border border-black/5 rounded-2xl p-5 flex flex-col gap-3 shadow-sm shadow-black/5"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{label}</span>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <div className="text-black font-extrabold text-3xl">{value}</div>
          {trend && (
            <span className="text-green-600 text-xs font-medium">{trend}</span>
          )}
        </div>
      ))}
    </div>
  );
}
