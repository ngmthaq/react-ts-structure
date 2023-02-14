export type NotificationType = "info" | "success" | "error" | "warning";

export interface Notification {
  type: NotificationType;
  message: string;
}

export interface CommonState {
  isLoading: boolean;
  notification: Notification | null;
  //   mode: ThemeMode;
}
