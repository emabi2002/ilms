import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const statusVariants = {
  // General statuses
  active: 'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  closed: 'bg-zinc-100 text-zinc-800 border-zinc-200',
  open: 'bg-blue-100 text-blue-800 border-blue-200',

  // Lease statuses
  expired: 'bg-red-100 text-red-800 border-red-200',
  terminated: 'bg-red-100 text-red-800 border-red-200',

  // Survey statuses
  lodged: 'bg-blue-100 text-blue-800 border-blue-200',
  under_review: 'bg-yellow-100 text-yellow-800 border-yellow-200',

  // Application statuses
  received: 'bg-blue-100 text-blue-800 border-blue-200',
  under_assessment: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  pending_signature: 'bg-orange-100 text-orange-800 border-orange-200',

  // Risk levels
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200',

  // Case statuses
  appeal: 'bg-purple-100 text-purple-800 border-purple-200',

  // ILG statuses
  registered: 'bg-green-100 text-green-800 border-green-200',
  suspended: 'bg-orange-100 text-orange-800 border-orange-200',
  dissolved: 'bg-red-100 text-red-800 border-red-200',

  // Customary statuses
  converted: 'bg-blue-100 text-blue-800 border-blue-200',
  disputed: 'bg-red-100 text-red-800 border-red-200',

  // Audit statuses
  in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/ /g, '_');
  const variant = statusVariants[normalizedStatus as keyof typeof statusVariants] ||
                  'bg-zinc-100 text-zinc-800 border-zinc-200';

  return (
    <Badge variant="outline" className={cn('font-medium', variant)}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}
