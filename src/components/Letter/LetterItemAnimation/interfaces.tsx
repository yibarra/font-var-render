export interface ILetterItemAnimation {
  letter: any;
  name: any;
  active: boolean;
  initialState: any;
  text: string;
  textProperties: any;
  onLetterFrames: (values: any) => any;
  setInstanceValue: (values: any, element: any) => void;
}