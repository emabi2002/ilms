import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorClass = 'text-blue-600',
}: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-600">
          {title}
        </CardTitle>
        <Icon className={cn('h-5 w-5', colorClass)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-900">{value}</div>
        {description && (
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-zinc-500 ml-2">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
