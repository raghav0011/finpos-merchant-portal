import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = (props) => {
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [props.pathname, props.search]);

  return props.children;
};

export default withRouter(ScrollToTop);
