export interface ILetterItemAnimation {
  letter: any;
  updateLetterItem: (index: number, value: any) => any;
  text: string;
  initialState: any;
  setInstanceValue: (values: any, element: any) => void;
  setLetter: (value: any) => any;
}