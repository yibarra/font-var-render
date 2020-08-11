export default class View {
  // props
  public app: any;
  public canvas: HTMLCanvasElement | null;

  // constructor
  constructor() {
    this.app = {};

    this.canvas = document.body.querySelector('#preview-canvas');
  }

  canvasDrawing (current: number = 0) {
    const ctx: any = this.canvas?.getContext('2d');

    if (ctx instanceof Object) {
      const letters = document.body.querySelectorAll('.letter-item-animation canvas');
      
      if (letters instanceof Object) {
        console.log(letters);
        //console.log(ctx, current);
      }

      /*const img = document.createElement('img');
          const data = parent.toDataURL("image/png", 1.0);

          img.setAttribute('src', data);
          img.setAttribute('data-index', current.toString());

          img.onload = () => {
            if (element) {
              if (container instanceof Object) {
                container.append(img);
              }
            }
          };*/
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

    this.canvasDrawing(current);
  }
}