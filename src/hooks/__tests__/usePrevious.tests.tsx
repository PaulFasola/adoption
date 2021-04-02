import React, { useState } from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { usePrevious } from '../usePrevious';
import { toHaveNoViolations } from 'jest-axe';

import 'jest-styled-components';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

const TestComponent: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const previousCounter = usePrevious<number>(counter);

  return (
    <div>
      Previous State: {previousCounter}
      Current State: {counter}
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
};
it('usePrevious hooks should work', () => {
  const wrapper = mount(<TestComponent />);
  expect(toJson(wrapper)).toMatchSnapshot();

  wrapper.find('button').simulate('click');
  wrapper.find('button').simulate('click');

  expect(toJson(wrapper)).toMatchSnapshot();
});
