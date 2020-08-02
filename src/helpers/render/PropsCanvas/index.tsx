// props
export default class PropsCanvas {
  // props
  public _height: number;
  public _width: number;

  // constructor
  constructor (width: number, height: number) {
    this._height = height > 0 ? height : 1920;
    this._width = width > 0 ? width : 1080;
  }

  // height
  get height() {
    return this._height;
  }

  set height(value: number) {
    this._height = value;  
  }

  // width
  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = value;  
  }
};