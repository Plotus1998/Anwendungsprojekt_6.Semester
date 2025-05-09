
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'fulfilled' | 'inProgress' | 'risk';
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'fulfilled':
        return { 
          label: 'Erfüllt',
          className: 'bg-status-fulfilled text-white' 
        };
      case 'inProgress':
        return { 
          label: 'In Bearbeitung',
          className: 'bg-status-inProgress text-white' 
        };
      case 'risk':
        return { 
          label: 'Gefährdet',
          className: 'bg-status-risk text-white' 
        };
      default:
        return { 
          label: status,
          className: 'bg-gray-200 text-gray-800' 
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={cn(
      "inline-flex rounded-full px-2 py-1 text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
