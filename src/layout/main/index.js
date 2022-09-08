import React from 'react';
import { connect } from 'react-redux';

import App from './App';

const AppLayout = (props) => {
  const updateLayout = (layout, boxedLayout, fixedSidenav, fixedHeader) => {
    switch (layout) {
      case '1':
        return (
          <App
            boxedLayout={boxedLayout}
            fixedSidenav={fixedSidenav}
            fixedHeader={fixedHeader}
            {...props}
          />
        );
      default:
        return <App />;
    }
  };

  const { layout, boxedLayout, fixedSidenav, fixedHeader } = props;

  return (
    <div id="app-layout-container">
      {updateLayout(layout, boxedLayout, fixedSidenav, fixedHeader)}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  layout: state.ui.layout,
  boxedLayout: state.ui.boxedLayout,
  fixedSidenav: state.ui.fixedSidenav,
  fixedHeader: state.ui.fixedHeader,
});

export default connect(mapStateToProps)(AppLayout);
