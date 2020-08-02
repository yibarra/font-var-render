import { ReactNode } from 'react';

export interface IFontTable {
  [name: string]: any;
}

export interface IFontInfo {
  //url: string | null,
  names: any,
  tables: IFontTable,
  ascender: number,
  getPath: any;
  descender: number,
  encoding: any,
  glyphNames: any,
  glyphs: any,
  unitsPerEm: number
}

export declare class FontFace {
  constructor(fontFamily: string, fontURL: string);
  family: string;
  style: string;
  weight: string;
  stretch: string;
  getPath: any;
  unicodeRange: string;
  variant: string;
  featureSettings: string;
  status: string;
  load(): Promise<FontFace>;
  loaded: Promise<FontFace>;
}

export interface CSSStyleDeclaration {
  fontVariationSettings: string | null;
}

export interface IFontSettingsContext {
  settings: any;
  setNamedInstance: (i: number) => void;
  setNamedInstanceValue: (item: object, element: any) => void;
  setInstanceValue: (settings: any, element: any) => void;
  initialState: any;
  setInitialState: (value: any) => any;
}

export interface IFontSettingsProvider {
  children: ReactNode;
  font: IFontInfo;
  getFvarTable: (any: any) => any;
}