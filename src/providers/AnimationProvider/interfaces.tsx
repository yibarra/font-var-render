import { ReactNode } from 'react';

export interface IAnimationContext {
  current: number;
  setCurrent: (value: any) => void;
  onOptions: (value: any) => any;
  options: any;
  onPlay: () => void;
  play: boolean;
}

export interface IAnimationProvider {
  children: ReactNode;
}