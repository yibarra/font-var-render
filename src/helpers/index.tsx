import View from './render/view';

// render letters
export default class RenderCanvas extends View {
  // constructor
  constructor () {
    super();

    this.load();
  }

  // render
  render (current: number) {
    this.renderView(current);
  }
}