/**
 * View
 */
export default class View {
  // props
  public app: any;
  public canvas: any;
  public videoStream: any;
  public mediaRecorder: any;
  public chunks: any;

  // constructor
  constructor() {
    this.app = {};

    this.canvas = document.body.querySelector('#preview-canvas');
    this.chunks = [];
  }

  // capture
  capture (canvas: any) {
    if (canvas instanceof Object === false) return false;

    this.videoStream = this.canvas.captureStream(29.97);
    this.mediaRecorder = new MediaRecorder(this.videoStream);

    const video:any = document.querySelector('video');

    this.mediaRecorder.ondataavailable = ({ data }: any) => data.size > 0 ? this.chunks.push(data) : null;

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { 'type' : 'video/mp4' });
      this.chunks = [];
      
      const videoURL: any = URL.createObjectURL(blob);
      
      video.src = videoURL;
      video.onloadeddata = () => this.download(videoURL);
    };
  }

  // canvas drawing
  canvasDrawing () {
    const scale = window.devicePixelRatio;
    const ctx: any = this.canvas?.getContext('2d');

    ctx.scale(scale, scale);

    if (ctx instanceof Object) {
      const letters = document.body.querySelectorAll('.letter-item-animation canvas');
      const previewContent = document.body.querySelector('.preview--content');

      ctx.clearRect(0, 0, 1920, 1080);
      ctx.beginPath();
      
      if (letters instanceof Object) {
        const { x, y }: any = previewContent?.getBoundingClientRect();

        letters.forEach((letter: any) => {
          if (letter instanceof Object) {
            const img = letter.getBoundingClientRect();

            if (img.width && img.height) {
              ctx.drawImage(letter, img.x - x, img.y - y, img.width, img.height);
            }
          }
        });
      }
    }
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

  // load
  load () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  // on resize
  onResize () {
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.

    if (this.canvas instanceof Object) {
      this.canvas.width = Math.floor(1920 * scale);
      this.canvas.height = Math.floor(1080 * scale);

      this.canvas.setAttribute('width', 1920 * window.devicePixelRatio);
      this.canvas.setAttribute('height', 1080 * window.devicePixelRatio);
      this.canvas.style.width = 1920 + 'px';
      this.canvas.style.height = 1080 + 'px';
    }
  }

  // render
  renderView (current: number, animate: boolean) {
    if (!this.canvas) {
      this.canvas = document.body.querySelector('#preview-canvas');
      this.capture(this.canvas);
    }
    
    if (animate === true) {
      if (this.mediaRecorder instanceof Object && this.mediaRecorder.state !== 'recording') {
        console.log('play');
        this.mediaRecorder.start();
      }
    } else if (this.mediaRecorder.state !== 'inactive') {
      console.log('stop');
      this.mediaRecorder.stop();
      this.capture(this.canvas);
    }

    this.canvasDrawing();
  }
}