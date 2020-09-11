import { ReactNode } from "react";

export interface IStepsSlider {
  children: ReactNode;
  current: number;
  direction: string;
  last: number;
  onPrevNext: (value: any) => any;
}