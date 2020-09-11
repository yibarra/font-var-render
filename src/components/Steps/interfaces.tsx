import { ReactNode } from "react";

export interface ISteps {
  children: ReactNode;
  current: number;
  direction: string;
  last: number;
  onPrevNext: (value: any) => any;
  type: any; 
};