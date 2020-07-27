import { ChangeEvent } from 'react';

export interface ILoad {
  font: any;
  onLoad: (event: ChangeEvent) => void;
}