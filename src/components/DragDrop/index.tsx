import React, { useCallback, memo, FunctionComponent } from 'react';
import { Uploader, IconButton, Icon } from 'rsuite';

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
    <Uploader
      autoUpload
      draggable
      accept=".ttf"
      fileListVisible={false}
      onChange={onDrop}>
        <IconButton icon={<Icon icon="upload" />} />
    </Uploader>
  );
};

export default memo(DragDrop);