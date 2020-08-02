import * as PIXI from 'pixi.js';

import PropsCanvas from './render/PropsCanvas';

// canvas render
export default class CanvasRender extends PropsCanvas {
  // state
  private _app: any;
  private _element: HTMLCanvasElement | undefined;
  private _renderer: any;

  // constructor
  constructor(width: number, height: number) {
    super(width, height);

    this._element = document.querySelector('#preview') as HTMLCanvasElement;
    this.createPreview(this._element);
  }

  // create preview
  createPreview(element: HTMLCanvasElement) {
    if (element instanceof Object === false) return false;

    this._app = new PIXI.Renderer({
      view: element,
      backgroundColor: 0x00000,
      height: this._height,
      width: this._width,
      resolution: window.devicePixelRatio,
      autoDensity: true
    });
  }

  // render
  render(letters: []) {

    console.log(letters);
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