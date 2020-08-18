import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';

export interface IWord {
  font: IFontInfo;
  getFvarTable: any
  index: number;
  letters: any;
  word: string;
  type: any;
  onChange: (value: any) => void;
}