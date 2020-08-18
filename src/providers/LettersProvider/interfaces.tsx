import { ReactNode } from 'react';

export interface ILettersContext {
  letters: [];
  getLetter: (index: number) => any;
  setLetters: (item: any) => any;
  updateLetterItem: (index: number, value:any) => any;
  getCountWords: (text: string) => any;
}

export interface ILettersProvider {
  children: ReactNode;
}