import { IFontInfo } from "../../providers/FontSettingsProvider/interfaces";

export interface ISelectInitState {
  font: IFontInfo;
  initialState: any;
  setInitialState: (value: any) => any;
}