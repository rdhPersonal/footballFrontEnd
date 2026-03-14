import { cn } from '../lib/cn';

type SparklineColor = 'gold' | 'emerald' | 'crimson' | 'default';

interface StatSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: SparklineColor;
  className?: string;
}

const strokeColors: Record<SparklineColor, string> = {
  gold: '#d4a843',
  emerald: '#2dd4a0',
  crimson: '#ef4444',
  default: '#8b85a1',
};

function buildPolylinePoints(data: number[], width: number, height: number): string {
  if (data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;

  return data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * (width - pad * 2) + pad;
      const y = height - pad - ((val - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function StatSparkline({
  data,
  width = 80,
  height = 32,
  color = 'default',
  className,
}: StatSparklineProps): React.ReactElement {
  const points = buildPolylinePoints(data, width, height);
  const stroke = strokeColors[color];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={cn('shrink-0', className)}
    >
      {points && (
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
