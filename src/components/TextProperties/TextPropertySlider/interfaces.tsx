export interface ITextPropertySlider {
  icon?: any;
  label?: string;
  property: string;
  onChange: (value: any, name: string) => any;
  options?: any;
  value: any;
}