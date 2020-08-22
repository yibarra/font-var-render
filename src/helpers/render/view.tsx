import RecordRTC from 'recordrtc';
import CanvasRecord from './canvas';

/**
 * View
 */
export default class View extends CanvasRecord {
  // capture
  capture (canvas: any) {
    this.recorder = new RecordRTC(canvas, {
      type: 'canvas',
      frameRate: 30,
      disableLogs: true //false
    });
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

  // render
  renderView (current: number, animate: boolean) {
    if (!this.canvas) {
      this.canvas = document.body.querySelector('#preview-canvas');
      this.capture(this.canvas);
    }
    
    if (animate === true) {
      if (this.recorder.getState() !== 'recording') {
        this.recorder.startRecording();
      }
    } else if (this.recorder.getState() !== 'inactive') {
      this.recorder.stopRecording(() => this.generateVideo(this.recorder.getBlob()));
    }

    this.canvasDrawing();
  }
}