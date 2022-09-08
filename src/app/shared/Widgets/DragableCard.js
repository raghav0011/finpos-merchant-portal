import React from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';

import './styles.css';

const DragableCard = (props) => {
  
  const { children, dragButton, onDrag, className, width } = props;

  return (
    <Draggable handle=".drag-btn-container" bounds="parent" className="p-0" onDrag={onDrag}>
      <div className={classNames('dragCard-container', className)} style={{ width: width }}>
        <div className="drag-btn-container mb-2">
          {dragButton || <span className="drag-btn ">Drag here</span>}
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default DragableCard;
