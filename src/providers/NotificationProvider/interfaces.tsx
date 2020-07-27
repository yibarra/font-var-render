import { ReactNode } from "react";

export interface INotificationContext {
  notificationBasic: (title: string, description: any) => any;
}

export interface INotificationProvider {
  children: ReactNode;
}