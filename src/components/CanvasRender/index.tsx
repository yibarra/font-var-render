import React, { memo, useContext, useEffect, useCallback, useRef, useState, FunctionComponent } from 'react';
import { Modal } from 'rsuite';
import axios from 'axios';

import { AnimationContext } from '../../providers/AnimationProvider';
import { LettersContext } from '../../providers/LettersProvider';

import { ICanvasRender } from './interfaces';

// canvas render
const CanvasRender: FunctionComponent<ICanvasRender> = ({ id, width, height, text }: any) => {
  // context
  const animationContext = useContext(AnimationContext);
  const lettersContext = useContext(LettersContext);

  const { current, setCurrent, processing, setProcessing } = animationContext;
  const { letters, getLineBreak } = lettersContext;

  // state
  const [ items, setItems ]: any = useState([]);
  const [ sendFrames, setSendFrames ]: any = useState(false);

  // element
  const element = useRef(null);

  // get bytes
  const getBytesBlob = useCallback((blob: any) => {
    let blobBin = atob(blob.split(',')[1]);
    let bytesArray = [];
    
    for (let i = 0; i < blobBin.length; i++) {
      bytesArray.push(blobBin.charCodeAt(i));
    }

    return bytesArray;
  }, []);

  // send frames
  const sendFrame = useCallback((image: any, current: number) => {
    if (!image) return false;

    const index: any = current < 10 ? `0${current}` : current;
    const file = new File([new Uint8Array(getBytesBlob(image))], `frame-${index}.png`, { type: 'image/png' });

    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_URL_SERVER;
    const formData = new FormData();
    formData.append('file', file);
    
    axios.post(`${url}/images`, formData, { headers: { 'enctype': 'multipart/form-data' } })
      .then(({ data }: any) => {
        if ((data && current < 99) && processing === true) {
          setCurrent(current + 1);
        } else if (processing === true) {
          setProcessing(false);
          setSendFrames(true);
          setCurrent(1);

          axios.get(`${url}/frames`).then(() => setSendFrames(true));
        }
      })
      .catch(e => console.log(e));
  }, [ getBytesBlob, setCurrent, processing, setProcessing ]);

  // add image
  const addImage = useCallback((canvas: any, current: number) => {
    if (canvas instanceof Object === false) return false;

    const image: any = new Image();
    const img: any = canvas.toDataURL('image/png', 1);

    image.onload = (() => {
      const images: any [] = items;
      images[current] = img;
      sendFrame(img, current);
      setItems(images);
    });

    image.src = img;
  }, [ items, sendFrame ]);

  // order by index
  const orderByIndex = useCallback((items: any[]) => {
    if (!Array.isArray(items)) return false;

    const order = items.sort((a, b) => {
      const aInd = a.index.split('-');
      const aIndex: number = parseInt(`${aInd[1]}${aInd[2]}`, 10);

      const bInd = b.index.split('-');
      const bIndex: number = parseInt(`${bInd[1]}${bInd[2]}`, 10);
      
      if (aIndex < bIndex) return -1;
      if (bIndex > aIndex) return 1;

      return 0;
    });

    return order;
  }, []);

  // create frame
  const createFrame = useCallback((current: any) => {
    const parent: any = element.current;

    if (parent instanceof Object) {
      parent.setAttribute('width', width);
      parent.setAttribute('height', height);

      const ctx = parent.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      let numberWord: number = 0;
      
      if (ctx) {
        let lastLine: number = 0;
        let positionX: number = 190;

        const lettersOrder: any = orderByIndex(letters);
        const countWords: any = getLineBreak(text).length;
        
        for (let i = 0; i < lettersOrder.length; i++) {
          const letter: any = lettersOrder[i];
    
          if (letter instanceof Object) {
            const { frames } = letter;
            const frame = frames[current];
    
            if (frame instanceof Object) {
              const { src, index } = frame;
              const frameWidth = frame.width;
              const frameHeight = frame.height;
              
              const indexes: any [] = index.split('-');
              const line = parseInt(indexes[1]);
              
              lastLine = line !== lastLine ? line : lastLine;
              let positionY = (lastLine * frameHeight) - (((countWords - 1) * (frameHeight / 2) - (frameHeight / 2)));

              if (line !== numberWord) {
                positionX = 190;
                numberWord = line;
              }
              
              ctx.drawImage(src, positionX, positionY);
              positionX += parseInt(frameWidth.toString(), 10);
            }
          }
        }

        addImage(parent, current);
      }
    }
  }, [ letters, element, addImage, height, width, orderByIndex, getLineBreak, text ]);

  // use effect
  useEffect(() => {
    createFrame(parseInt(Math.floor(current).toString(), 10));
  }, [ current, createFrame ]);

  // render
  return (
    <>
    <canvas
      id={id}
      height={height}
      width={width}
      ref={element}>
    </canvas>

    <Modal backdrop={sendFrames} show={sendFrames}>
      <Modal.Body>
        <p className="text">
          Your video was successfully send, it cant take a few minutes.
          <a href='https://font-var-render-server.herokuapp.com/output'>
            visit
          </a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-default" onClick={() => setSendFrames(false)}>OK</button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default memo(CanvasRender);