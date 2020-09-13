import React, { FunctionComponent } from 'react';

import { IHeader } from './interfaces';

import './header.scss';

// header
const Header: FunctionComponent<IHeader> = ({ children }) => {
  // header
  return (
    <div className="header">
      {children}
    </div>
  );
};

export default Header;