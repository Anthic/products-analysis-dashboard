import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  UserPlus, 
  RefreshCw 
} from 'lucide-react';

import { formatDateTime } from '@/lib/transformers/formatDate';
import { ActivityType, SystemActivity } from '@/lib/types/activity';

interface ActivityFeedProps {
  activities: SystemActivity[];
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case 'order_created':
      return <Clock className="w-3.5 h-3.5 text-white" />;
    case 'order_updated':
      return <CheckCircle2 className="w-3.5 h-3.5 text-white" />;
    case 'customer_signed_up':
      return <UserPlus className="w-3.5 h-3.5 text-white" />;
    case 'payment_failed':
      return <XCircle className="w-3.5 h-3.5 text-white" />;
    case 'refund_issued':
      return <RefreshCw className="w-3.5 h-3.5 text-white" />;
    default:
      return <AlertTriangle className="w-3.5 h-3.5 text-white" />;
  }
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white border-2 border-black rounded-none p-4 md:p-5 shadow-none text-black">
      <div className="mb-4">
        <h2 className="text-sm md:text-base font-bold font-mono text-black uppercase tracking-tight">System Activity</h2>
        <p className="text-xs text-neutral-700 font-sans font-medium">Recent operational events & alerts</p>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start gap-3 text-xs border-b border-black/15 pb-2.5 last:border-b-0">
            <div className="w-7 h-7 bg-black text-white flex items-center justify-center rounded-none border border-black shrink-0 mt-0.5">
              {getActivityIcon(act.type)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-black font-semibold font-sans leading-snug">
                {act.message}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-600 font-mono">
                {act.actor ? (
                  <span className="font-bold text-black">by {act.actor}</span>
                ) : (
                  <span className="font-bold text-neutral-500">system</span>
                )}
                <span>•</span>
                <span>{formatDateTime(act.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

