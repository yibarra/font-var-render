import { ReactNode } from 'react';

import { IFontInfo } from '../FontSettingsProvider/interfaces';

export interface ILettersContext {
  letters: [];
  getLetter: (index: number) => any;
  setLetters: (item: any) => any;
  updateLetterItem: (index: number, value:any) => any;
  getCountWords: (text: string) => any;
  getLineBreak: (text: string) => any;
  getAlign: (text: string) => string;
  textWordLetter: (font: IFontInfo, text: string, getFvarTable: any, onChange: any, type: any) => any;
}

export interface ILettersProvider {
  children: ReactNode;
}