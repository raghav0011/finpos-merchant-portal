import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PublicRoute from './PublicRoute';
import { AsyncAppStaticLayout, AsyncForbidden } from './main/AsyncComponent';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const wrapper = mount(
    <Router initialEntries={['/500']}>
      <PublicRoute path="/500" layout={AsyncAppStaticLayout} component={AsyncForbidden} />
    </Router>
  );

  return {
    wrapper,
  };
};

describe('Routes --- PublicRoute', () => {
  it('should redirect to /500 when user is not logged in', () => {
    const { wrapper } = setup();
    expect(wrapper.find('PublicRoute[path="/500"]').props().component).toEqual(AsyncForbidden);
  });
});
