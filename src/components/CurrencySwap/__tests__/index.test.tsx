import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, shallow } from 'enzyme';
import { TokenSwap } from '..';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('TokenSwap component', () => {
  it('should render', () => {
    shallow(<TokenSwap />);
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(<TokenSwap />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
