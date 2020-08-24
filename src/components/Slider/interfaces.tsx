import { ReactNode } from 'react';

export interface ISlider {
  children: ReactNode;
  current: number;
  direction: string;
  last: number;
  onPrevNext: (value: any) => any;
  type: any;
}