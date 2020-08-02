import * as PIXI from 'pixi.js';

import PropsCanvas from './render/PropsCanvas';
import { IFontInfo } from '../providers/FontSettingsProvider/interfaces';

// canvas render
export default class CanvasRender extends PropsCanvas {
  // state
  private _app: any;
  private _element: any;
  private _renderer: any;

  // constructor
  constructor(width: number, height: number) {
    super(width, height);

    this._element = document.querySelector('#preview') as HTMLCanvasElement;
    this.createPreview(this._element);

    this.render = this.render.bind(this);
  }

  // create preview
  createPreview(element: any) {
    if (element instanceof Object === false) return false;

    this._element = element;
  }

  letters(current: number, letters: any[], font: IFontInfo) {
    if (letters instanceof Object === false) return false;

    // Now let's display it on a canvas with id "canvas"
    const ctx: any = this._element.getContext('2d');

    console.dir(this._element.getContext);//.getContext);
    
    if (ctx) {
      console.log(ctx, 'vamos');
      const path = font.getPath('Hello, World!', 0, 150, 72);

      // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).
      path.draw(ctx);
    }

    /*
    for (let key in letters) {
      const letter = letters[key];

      if (letter instanceof Object) {
        const path = font.getPath('Hello!', 0, 150, 72);

        console.log('letter', path);
      }
    }*/
  }

  // render
  render(current: number, letters: [], font: IFontInfo) {
    if (letters instanceof Object === false) return false;
    this.letters(current, letters, font);
  }
};
/*

  // create preview
  createPreview(width: number, height: number) {
    if (this.element instanceof Object === false) return false;

    this.renderer = PIXI.autoDetectRenderer({
      backgroundColor: 0x999999,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      height: height,
      width: width,
      view: this.element,
    });
  }
}*/