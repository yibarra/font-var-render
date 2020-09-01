import CanvasRecord from './canvas';

/**
 * View
 */
export default class View extends CanvasRecord {
  public chunks: any[];
  public mediaRecorder: any;
  public videoStream: any;

  constructor() {
    super();

    this.chunks = [];
  }

  // capture
  capture (canvas: any) {
    if (canvas instanceof Object === false) return false;

    this.videoStream = this.canvas.captureStream(30);
    this.mediaRecorder = new MediaRecorder(this.videoStream);

    const video:any = document.querySelector('video');

    this.mediaRecorder.ondataavailable = ({ data }: any) => data.size > 0 ? this.chunks.push(data) : null;

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { 'type' : 'video/mp4; codecs="avc1.4d002a"' });
      this.chunks = [];
      
      const videoURL: any = URL.createObjectURL(blob);
      
      video.src = videoURL;
      video.onloadeddata = () => this.generateVideo(blob);
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
              ctx.drawImage(letter, img.x - x, img.y - (y - (540 / 2)), img.width, img.height);
            }
          }
        });
      }
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