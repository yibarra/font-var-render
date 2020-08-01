import { IFontInfo } from "../../../providers/FontSettingsProvider/interfaces";

export interface IPreviewRender {
  font: IFontInfo;
  letters: any[];
  textProperties: any;
}