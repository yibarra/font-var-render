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

    console.log(blob, ' video post blob');

    axios({
      method: 'POST',
      url: 'https://font-var-render-server.herokuapp.com/upload-video',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
    .then(e => this.download(window.URL.createObjectURL(blob)))
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
  }

  // generate video
  generateVideo (blob: any) {
    this.postBlob(blob);
  }
}