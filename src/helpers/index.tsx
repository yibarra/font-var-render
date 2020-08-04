import Render from './render/render';

import { IFontInfo } from '../providers/FontSettingsProvider/interfaces';

// canvas render
export default class CanvasRender extends Render {
  // constructor
  constructor(font: IFontInfo, width: number, height: number) {
    super(font, width, height);
  }

  // render
  render(current: number, letters: [], text: string, textProperties: any) {
    if (letters instanceof Object === false) return false;

    if (this.canvas instanceof Object) {
      const items = this.createLetters(text, letters);
      this.renderCanvas(current, items);
    }
  }
};
