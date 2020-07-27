import { ReactNode } from "react";

export interface ITextContext {
  text: string;
  setText: (value: string) => void;
  textProperties: [];
  setTextProperties: (value:any) => void;
}

export interface ITextProvider {
  children: ReactNode;
}