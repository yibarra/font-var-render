import { ChangeEvent, ReactNode } from 'react';
import { IFontInfo } from '../FontSettingsProvider/interfaces';

export interface ILoadFontContext {
  font: IFontInfo;
  onLoad: (event: ChangeEvent) => void,
}

export interface ILoadFontProvider {
  children: ReactNode;
}