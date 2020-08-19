import React, { useCallback, memo, FunctionComponent } from 'react';
import { Uploader } from 'rsuite';

import { IDragDrop } from './interfaces';

import './drag-drop.scss';

// drag drop
const DragDrop: FunctionComponent<IDragDrop> = ({ onLoad }) => {
  // on drop
  const onDrop = useCallback(files => {
    if (files.length > 0) {
      const item = files[files.length - 1];

      if (item instanceof Object) {
        onLoad(item.blobFile);
      }
    }
  }, [ onLoad ]);

  // render
  return (
    <div className="drag-drop" data-active={true}>
      <Uploader
        autoUpload
        draggable
        accept=".ttf"
        fileListVisible={false}
        onChange={onDrop}>
          <div className="drag-drop--container">
            <p className="drag-drop--container--text">Area to upload</p>
          </div>
      </Uploader>
    </div>
  );
};

export default memo(DragDrop);