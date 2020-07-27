import { ReactNode } from "react";

export interface INotificationContext {
  notificationBasic: (title: string, description: string) => void;
  notificationSuccess: (title: string, description: string) => void;
  notificationError: (title: string, description: string) => void;
}

export interface INotificationProvider {
  children: ReactNode;
}