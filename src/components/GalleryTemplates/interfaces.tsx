export interface IGalleryTemplates {
  current: number;
  items: any[];
  onPrevNext: (value: any) => any;
  text: string;
  setText: (value: any) => any;
  setTextProperties: (value: any) => any;
}