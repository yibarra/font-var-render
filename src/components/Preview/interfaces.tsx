import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';

export interface IPreview {
  font: IFontInfo;
  text: string;
  textProperties: any;
}