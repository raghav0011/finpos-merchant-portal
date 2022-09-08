import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Authorization from './Authorization';
import Dashboard from '../containers/Dashboard';

import { isAllowed } from '../utils/permissionUtil';

import { AsyncAppLayout } from './main/AsyncComponent';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const wrapper = mount(
    <Router initialEntries={['/dashboard']}>
      <Authorization path="/dashboard" layout={AsyncAppLayout} component={Dashboard} />
    </Router>
  );

  return {
    wrapper,
  };
}

describe('Routes --- Authorization', () => {
  it('should redirect to 403 page when user is not allowed', () => {
    // isAllowed= jest.fn().mockReturnValue(false);
    expect(isAllowed()).toBe(false);
    const { wrapper } = setup();
    expect(wrapper.find(Dashboard).length).toEqual(0);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/403');
  });
});
