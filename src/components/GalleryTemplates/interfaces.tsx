export interface IGalleryTemplates {
  current: number;
  last: number;
  items: any[];
  onPrevNext: (value: any) => any;
  text: string;
  setText: (value: any) => any;
  textPropertiesMain: any;
  setTextProperties: (value: any) => any;
}