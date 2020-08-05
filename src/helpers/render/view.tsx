import * as PIXI from 'pixi.js';

export default class View {
  // props
  public app: any;
  public canvas: HTMLCanvasElement | undefined;

  // constructor
  constructor() {
    this.app = new PIXI.Application({
      width: 800,
      height: 500,
      backgroundColor:0x999999,
      resolution: window.devicePixelRatio,
      autoStart: false,
      autoDensity: true,
    });
  }

  // load
  load () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  // get parent
  getParent() {
    if (this.canvas instanceof Object === false) {
      const parent: any = document.body.querySelector('.preview--canvas');
    
      if (parent instanceof Object) {
        this.canvas = parent.querySelector('canvas');
  
        if (!this.canvas) {
          parent.appendChild(this.app.view);
        }
      }
    }
  }

  // on resize
  onResize () {
    console.log('resize parent view!!!');
  }

  // render
  renderView (current: number) {
    this.getParent();

    console.log(current, '--');
  }
}