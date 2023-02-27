import Icon from "@mui/material/Icon";

export interface AppConst {
  header: HeaderAppConst;
  footer: FooterAppConst;
  nav: FooterAppConst;
  viewModes: ViewModeConst;
  notification: NotificationConst;
  jobModes: JobModes;
}

export interface HeaderAppConst {
  height: number;
}

export interface FooterAppConst {
  height: number;
}

export interface NavAppConst {
  height: number;
}

export interface NotificationConst {
  timeout: number;
}

export interface ViewMode {
  id: number;
  alt: string;
  Icon: Icon;
}

export interface ViewModeConst {
  swipe: ViewMode;
  scroll: ViewMode;
}

export interface JobModes {
  recommended: string;
  filter: string;
}
