import React from 'react';

import LogoImage from '../../../assets/finpos_lg.png';
import SmallLogo from '../../../assets/icon-logo.png';

const Logo = (props) => {
  const { collapsedNav } = props;

  return collapsedNav !== true ? (
    <img
      src={LogoImage}
      style={{
        // position: 'absolute',
        // top: '0',
        // left: '0',
        width: '100%',
        // height: 60,
        // padding: 12,
      }}
      alt="Bank Logo"
    />
  ) : (
    <img style={{ width: '100%' }} src={SmallLogo} alt={' Bank Logo'} />
  );
};

export default Logo;
