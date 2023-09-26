export interface Notification {
  icon?: ({ className }: { className?: string }) => JSX.Element;
  title: string;
  description?: string;
  duration?: number;
  timestamp: number;
  canClose?: boolean;
  actions?: NotificationAction[];
}

export type NotificationAction = {
  label: string;
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  class?: string;
  callback: () => void;
};
