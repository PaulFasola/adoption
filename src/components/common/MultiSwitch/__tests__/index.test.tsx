import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme';

import 'jest-styled-components';
import { MultiSwitch } from '..';

configure({ adapter: new Adapter() });

describe('MultiSwitch component', () => {
  it('should render', () => {
    render(<MultiSwitch name='test' values={[]} />);
  });

  it('should update its value when its custom input\'s value changed', () => {
    const mockedOnChangeCb = jest.fn();
    const TEST_STR = 'test!';

    const { container } = render(<MultiSwitch
      name='test'
      values={[]}
      onChange={mockedOnChangeCb}
      customValue={{
        type: 'text'
      }} />);

    const input = container.querySelector('input');
    input && fireEvent.change(input, { target: { value: TEST_STR } })
    expect(mockedOnChangeCb).toHaveBeenCalledWith(TEST_STR)
  });

});
