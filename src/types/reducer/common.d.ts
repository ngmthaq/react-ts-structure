export type CommonState = {
  isLoading: boolean;
  isCallingApi: boolean;
  notification: Notification | null;
};

export type Notification = {
  message: string;
  variant: NotificationVariants;
  isOpen: boolean;
};

export type NotificationVariants =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
