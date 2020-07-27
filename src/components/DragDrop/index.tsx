import React, { useCallback, memo, FunctionComponent } from 'react';
import { Row, Uploader } from 'rsuite';

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
    <Row className="drag-drop" data-active={true}>
      <Uploader
        autoUpload={false}
        fileListVisible={false}
        draggable
        onChange={onDrop}>
          <div className="drag-drop--container">
            <p className="drag-drop--container--text">Click or Drag files to this area to upload</p>
          </div>
      </Uploader>
    </Row>
  );
};

export default memo(DragDrop);