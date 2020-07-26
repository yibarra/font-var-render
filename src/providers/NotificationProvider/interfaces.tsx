import { ReactNode } from "react";

export interface INotificationContext {
  open: (title: string, description: string) => any;
}

export interface INotificationProvider {
  children: ReactNode;
}