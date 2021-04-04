import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { configure } from 'enzyme';

import 'jest-styled-components';
import { MultiSwitch } from '..';

configure({ adapter: new Adapter() });

describe('MultiSwitch component', () => {
  it('should render', () => {
    render(<MultiSwitch name='test' values={[]} />);
  });
});
