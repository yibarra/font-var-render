import Letter from './letter';
import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';

// Render
export default class Render extends Letter {
  public canvas: HTMLCanvasElement;
  private font: IFontInfo;

  // constructor
  constructor(font: IFontInfo, width: number, height: number) {
    super(width, height);

    this.font = font;
    this.canvas = document.querySelector('#preview') as HTMLCanvasElement;

    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.init();
  }

  // init
  init() {
    window.addEventListener('resize', (e) => this.resizeCanvas(e));
    this.resizeCanvas(null);
  }

  // resize canvas
  resizeCanvas(e: any) {
    if (this.canvas) {
      const parent: HTMLElement = this.canvas.parentNode as HTMLElement;

      if (parent instanceof Object) {
        const { width }: any = parent.getBoundingClientRect();

        this.canvas.setAttribute('width', Math.floor(width).toString());
      }
    }
  }

  // letters
  renderLetters(current: number, letters: any[]) {
    if (letters instanceof Object === false) return false;

    const ctx: any = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 150);
    ctx.beginPath();

    let count = 0;

    for (let key in letters) {
      const letter = letters[key];

      if (letter instanceof Object) {
        const { value, settings } = letter;

        console.log({ features: settings });
        
        if (value) {
          const values = settings.length > 0 ? settings.join('') : '';
          console.log(values, settings);

          const path = this.font.getPath(value.toString(), count, 72, 72, { features: values }); // mudar pelo current
          //this.font.drawPoints(ctx, value.toString(), count, 72, 72);
          this.font.drawMetrics(ctx, value.toString(), count, 72, 72);

          path.draw(ctx);
        }
        
        count += parseInt(this.font.getAdvanceWidth(letter.value));
      }
    }
  }

  // render
  renderCanvas(current: number, letters: []) {
    if (letters instanceof Object === false) return false;
    
    console.log(current);
    this.renderLetters(current, letters);
  }
}