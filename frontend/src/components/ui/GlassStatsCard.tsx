import { motion } from 'framer-motion';

interface GlassStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable' | string;
  trendValue?: string;
  trendUp?: boolean;
  accentColor?: string; // tailwind color name e.g. 'indigo', 'emerald'
  color?: string; // backwards compatibility
}

/**
 * Premium stats card for dashboards and reports.
 * Shows a key metric with optional trend indicator.
 */
const GlassStatsCard: React.FC<GlassStatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  accentColor = 'indigo',
}) => {
  const borderColor = `border-t-${accentColor}-500`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 border-t-4 ${borderColor} group hover:-translate-y-1 transition-transform`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
        {icon && (
          <div className={`p-2 bg-${accentColor}-50 text-${accentColor}-500 rounded-lg`}>
            {icon}
          </div>
        )}
      </div>
      <h3 className="font-black text-3xl text-slate-800 tracking-tighter">{value}</h3>
      {(subtitle || trendValue) && (
        <div className="mt-2 flex items-center gap-2">
          {trendValue && (
            <span className={`text-xs font-bold ${
              trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-amber-500'
            }`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
          {subtitle && <span className="text-xs font-bold text-slate-400">{subtitle}</span>}
        </div>
      )}
    </motion.div>
  );
};

export default GlassStatsCard;
