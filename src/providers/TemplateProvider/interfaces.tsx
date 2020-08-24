import { ReactNode } from 'react';

export interface ITemplateContext {
  generate: (text: string) => void;
}

export interface ITemplateProvider {
  children: ReactNode;
}