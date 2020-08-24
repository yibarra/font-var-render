export interface ISliderGallery {
  className: string;
  current: any;
  children: any;
  width: any;
  onPrevNext: (dir: any, value: any) => void;
}