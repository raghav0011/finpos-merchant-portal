import React from 'react';
import { Layout } from 'antd';

import LAYOUT_CONFIG from '../../layout/config';
import '../../assets/finPAY.svg';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="app-footer app-footer-custom" style={{ marginTop: 'auto' }}>
    <div className="footer-inner-v1">
      <span className="small">
        <img
          style={{ marginRight: 4, marginTop: -4 }}
          src="finPAY.svg"
          // height={80}
          width={80}
          alt="CityTech"
        ></img>
        © {LAYOUT_CONFIG.year}{' '}
        <a
          className="brand"
          rel="noopener noreferrer"
          target="_blank"
          href="http://citytech.global"
        >
          {LAYOUT_CONFIG.brand}. All Rights Reserved.
        </a>
      </span>
    </div>
  </Footer>
);

export default AppFooter;
