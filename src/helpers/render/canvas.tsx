import axios from 'axios';

export default class CanvasRecord {
  public canvas: any;
  public recorder: any;

  public input: any;

  // constructor
  constructor() {
    this.canvas = document.getElementById('preview-canvas');
    this.input = document.getElementById('time-current');
  }

  // animation
  animation (deltaTime: number) {
    const delayInit: number = 0.110;
    const animation: number = deltaTime * 0.001;

    if (animation >= delayInit) {
      const percent = ((deltaTime - delayInit) / 940) * 100;

      if (percent > 100) {
        return 100;
      }

      return parseFloat(percent.toString()).toFixed(2);
    } else {
      return 0;
    }
  }

  // change
  change () {
    this.input = document.getElementById('time-current');

    if (this.input instanceof Object) {
      console.log(this.input);
      this.input.addEventListener('change', (e: any) => console.log(e), false);
    }
  }

  // load
  load () {
    this.canvas = document.getElementById('preview-canvas');
    this.change();
  }

  // post blob
  postBlob(blob: any) {
    let formData = new FormData();
    formData.append('file', blob);

    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_URL_SERVER;

    axios({
      method: 'POST',
      url: `${url}/upload-video`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    .then(e => console.log(e))// this.download(`${url}/output`))
    .catch(e => console.log(e));
  }

  // download
  download(url: any) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'video';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    const btn = document.querySelector('.btn-reset') as HTMLButtonElement;
    btn.click();
  }

  // generate video
  generateVideo (blob: any) {
    this.postBlob(blob);
  }
}