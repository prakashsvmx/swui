import React from 'react';
import {
  shallow,
} from 'enzyme';
import NotFound from './NotFound';

describe('NotFound Tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = null;
  });

  afterEach(() => {
    if (wrapper && wrapper.unmount) {
      wrapper.unmount();
    }
  });

  it('Render without crashing', () => {
    wrapper = shallow(<NotFound />,
    );
    expect(wrapper).toBeDefined();
  });
});
