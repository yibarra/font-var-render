export interface IStepsFooter {
  current: number;
  last: number;
  count: any;
  onPrevNext: (value: any) => any;
}