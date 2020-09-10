import React, { memo, useContext, useEffect, useCallback, useRef, useState } from 'react';
import axios from 'axios';

import { AnimationContext } from '../../providers/AnimationProvider';
import { LettersContext } from '../../providers/LettersProvider';

// canvas render
const CanvasRender = ({ id, width, height }: any) => {
  // context
  const animationContext = useContext(AnimationContext);
  const lettersContext = useContext(LettersContext);

  const { current } = animationContext;
  const { letters } = lettersContext;

  // state
  const [ items, setItems ]: any = useState([]);
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
      .then(e => console.log(e)) // this.download(`${url}/output`))
      .catch(e => console.log(e));
  }, [ getBytesBlob ]);

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

      if (ctx) {
        let x: number = 190;
        
        for (let i = 0; i < letters.length; i++) {
          const letter: any = letters[i];
    
          if (letter instanceof Object) {
            const { frames } = letter;
            const frame = frames[current];
    
            if (frame instanceof Object) {
              const { src, index } = frame;
              const frameWidth = frame.width;
              const frameHeight = frame.height;

              const indexes: any [] = index.split('-');
              const line = indexes[1];
              
              ctx.drawImage(src, x, (height / 2) - ((line + 1) * (frameHeight / 2)));
              x += parseInt(frameWidth.toString(), 10);
            }
          }
        }

        addImage(parent, current);
      }
    }
  }, [ letters, element, addImage, height, width ]);

  // use effect
  useEffect(() => {
    createFrame(parseInt(Math.floor(current).toString(), 10));
  }, [ current, createFrame ]);

  // render
  return (
    <>
    <canvas id={id} width={width} height={height} ref={element} />
    </>
  );
};

export default memo(CanvasRender);