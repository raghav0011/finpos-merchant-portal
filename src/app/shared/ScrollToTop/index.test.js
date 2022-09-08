import React from 'react';
import { Router } from 'react-router';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import history from '../../../utils/history';
import ScrollToTop from '.';

Enzyme.configure({ adapter: new Adapter() });

global.scrollTo = jest.fn();

describe('Component --- ScrollToTop', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Router history={history} initialEntries={['/']}>
        <ScrollToTop>
          <p>Hi</p>
        </ScrollToTop>
      </Router>
    );
  });

  it('should call window.scrollTo when route changes', () => {
    expect(global.scrollTo).not.toHaveBeenCalled();
    history.push('/dashboard');
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should render children component', () => {
    expect(wrapper.find(ScrollToTop).children().length).toEqual(1);
    expect(wrapper.find(ScrollToTop).contains(<p>Hi</p>)).toEqual(true);
  });
});
