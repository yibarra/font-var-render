import { ReactNode } from 'react';

export interface IAnimationContext {
  current: number;
  setCurrent: (value: any) => void;
  onPlay: () => void;
  processing: boolean;
  setProcessing: (value: any) => void;
  play: boolean;
}

export interface IAnimationProvider {
  children: ReactNode;
}