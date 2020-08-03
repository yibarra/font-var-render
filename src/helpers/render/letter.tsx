import { IFontInfo } from "../../providers/FontSettingsProvider/interfaces";
import PropsCanvas from "./PropsCanvas";

export default class Letter extends PropsCanvas {
  // create letters
  createLetters(text: string, letters: any[]) {
    const items: any = [];

    for (let i = 0; i < text.length; i++) {
      items.push({ index: i, value: text[i], settings: {} });
    }

    return this.joinLetters(items, letters);
  }

  // join
  joinLetters(items: any[], letters: any[]) {
    const joinItems:any = items;

    for (let key in letters) {
      const letter = letters[key];

      if (letter instanceof Object) {
        const { index } = letter;

        joinItems[index] = letter;
      }
    }

    return joinItems;
  }

  // letters
  letters(letters: any[], canvas: any, font: IFontInfo) {
    for (let key in letters) {
      const letter = letters[key];

      if (letter instanceof Object) {
        this.getPathLetter(letter, canvas, font, []);
      }
    }
  }

  // get path letter
  getPathLetter(letter: any, canvas: any, font: IFontInfo, settings: any[]) {
    if (letter instanceof Object === false || !canvas.getContext) return false;

    const ctx: HTMLCanvasElement = canvas.getContext('2d');
    
    if (ctx) {
      const { value } = letter;
      console.log('render letter');
      const path = font.getPath(value.toString(), 0, 150, 72, settings);
      path.draw(ctx);
    }
  }
}