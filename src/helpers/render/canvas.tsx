import axios from 'axios';

export default class CanvasRecord {
  public canvas: any;
  public recorder: any;

  public aab: any;

  // constructor
  constructor() {
    this.canvas = document.body.querySelector('#preview-canvas');
    this.aab = [];
  }

  // load
  load () {
    this.canvas = document.body.querySelector('#preview-canvas');
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