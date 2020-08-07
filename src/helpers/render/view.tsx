export default class View {
  // props
  public app: any;
  public canvas: HTMLCanvasElement | undefined;

  // constructor
  constructor() {
    this.app = {};
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
        console.log('yeah parent');
      }
    }
  }

  // on resize
  onResize () {
    console.log('resize parent view!!!');
  }

  // render
  renderView (current: number) {
    //this.getParent();
    console.log(current + ' current');
  }
}