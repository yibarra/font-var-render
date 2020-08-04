import Letter from './letter';
import { IFontInfo } from '../../providers/FontSettingsProvider/interfaces';
import { settings } from 'cluster';

// Render
export default class Render extends Letter {
  private canvas: HTMLCanvasElement;
  private font: IFontInfo;

  // constructor
  constructor(font: IFontInfo, width: number, height: number) {
    super(width, height);

    this.font = font;
    this.canvas = document.querySelector('#preview') as HTMLCanvasElement;
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
        
        const path = this.font.getPath(value.toString(), count, 72, 72, settings); // mudar pelo current
        this.font.drawPoints(ctx, value.toString(), count, 72, 72, settings);
        //this.font.drawMetrics(ctx, value.toString(),  (parseInt(key) * 60), 72, 72, settings);
        
        count += parseInt(this.font.getAdvanceWidth(letter.value));
        console.log(letter.value);
        path.draw(ctx);
      }
    }
    
    /*
    if (ctx) {
      console.log(ctx, 'vamos');
      const path = this.font.getPath('He', 0, 150, 72);

      // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).
      path.draw(ctx);
    }

    */
  }

  // render
  renderCanvas(current: number, letters: []) {
    if (letters instanceof Object === false) return false;
    
    this.renderLetters(current, letters);
  }
}