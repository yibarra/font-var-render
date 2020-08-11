/**
 * View
 */
export default class View {
  // props
  public app: any;
  public canvas: HTMLCanvasElement | null;

  // constructor
  constructor() {
    this.app = {};

    this.canvas = document.body.querySelector('#preview-canvas');
  }

  // canvas drawing
  canvasDrawing () {
    const ctx: any = this.canvas?.getContext('2d');
    
    if (ctx instanceof Object) {
      const letters = document.body.querySelectorAll('.letter-item-animation canvas');

      ctx.clearRect(0, 0, 1020, 1080);
      ctx.beginPath();
      
      if (letters instanceof Object) {
        const { x, y }: any = this.canvas?.getBoundingClientRect();

        letters.forEach((letter: any) => {
          if (letter instanceof Object) {
            const img = letter.getBoundingClientRect();

            ctx.drawImage(letter, img.x - x, y - img.y);
          }
        });
      }
    }
  }

  // load
  load () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  // on resize
  onResize () {
    console.log('resize parent view!!!');
  }

  // render
  renderView (current: number) {
    if (!this.canvas) {
      this.canvas = document.body.querySelector('#preview-canvas');
    }

    this.canvasDrawing();
  }
}