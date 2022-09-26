import React from 'react';
import { Layout } from 'antd';

import LAYOUT_CONFIG from '../../layout/config';
import LogoImage from '../../assets/finpos_sm.png';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer app-footer-custom" style={{ marginTop: 'auto' }}>
    <div style={{ textAlign: 'center' }}>
      <span className="small">
        <img src={LogoImage} alt="Finpos Logo" style={{ height: '20px' }}></img>©{' '}
        {LAYOUT_CONFIG.year}{' '}
        <a
          className="brand"
          rel="noopener noreferrer"
          target="_blank"
          href="http://citytech.global"
        >
          {LAYOUT_CONFIG.brand}. All Rights Reserved.
        </a>
      </span>
      <span style={{ float: 'right' }}>
        Version: <strong>{process.env.REACT_APP_VERSION ?? '1.0.0'}</strong>
      </span>
    </div>
  </Footer>
);

export default AppFooter;
