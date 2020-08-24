import { ReactNode } from 'react';

export interface ITemplateContext {
  generate: (text: string, template: any[]) => void;
}

export interface ITemplateProvider {
  children: ReactNode;
}