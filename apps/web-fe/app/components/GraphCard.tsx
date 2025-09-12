import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataPoint {
  month: string;
  value: number;
}

interface GraphCardProps {
  title: string;
  description: string;
  data: DataPoint[];
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
    period: string;
  };
  subtitle?: string;
  className?: string;
}

const GraphCard: React.FC<GraphCardProps> = ({
  title,
  description,
  data,
  trend,
  subtitle,
  className = '',
}) => {
  const createPath = (points: DataPoint[]) => {
    if (points.length === 0) return '';
    
    const maxValue = Math.max(...points.map(p => p.value));
    const minValue = Math.min(...points.map(p => p.value));
    const range = maxValue - minValue || 1;
    
    const width = 400;
    const height = 100;
    const padding = 20;
    
    const pathData = points
      .map((point, index) => {
        const x = padding + (index * (width - 2 * padding)) / (points.length - 1);
        const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
    
    return pathData;
  };

  const path = createPath(data);

  return (
    <div className={`bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        {subtitle && (
          <p className="text-[#888888] text-sm">{subtitle}</p>
        )}
      </div>

      <div className="mb-6">
        <svg
          width="100%"
          height="120"
          viewBox="0 0 400 100"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a9eff" stopOpacity="1" />
              <stop offset="100%" stopColor="#4a9eff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <g opacity="0.05">
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="20"
                y1={20 + i * 15}
                x2="380"
                y2={20 + i * 15}
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            ))}
          </g>

          <path
            d={path}
            stroke="#4a9eff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />

          {data.map((point, index) => {
            const maxValue = Math.max(...data.map(p => p.value));
            const minValue = Math.min(...data.map(p => p.value));
            const range = maxValue - minValue || 1;
            const x = 20 + (index * 360) / (data.length - 1);
            const y = 80 - ((point.value - minValue) / range) * 60;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2.5"
                fill="#4a9eff"
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>

        <div className="flex justify-between mt-2 px-5">
          {data.map((point, index) => (
            <span key={index} className="text-xs text-[#666666]">
              {point.month}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {trend && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                Trending {trend.direction} by {trend.percentage}% {trend.period}
              </span>
            </div>
          </div>
        )}
        <p className="text-[#888888] text-sm">{description}</p>
      </div>
    </div>
  );
};

export default GraphCard;