import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, render } from '@testing-library/react';
import { configure, mount, shallow } from 'enzyme';
import { IProps } from '../fieldBuilder';
import { ILocalProps, TextField } from '../textField';
import { DEFAULT_DEBOUNCE_DELAY } from '../../constants';

import 'jest-styled-components';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

const getComponent = (props?: Partial<IProps> & ILocalProps) => (
  <TextField type='string' {...props} name='test' label='test' />
);

describe(`CurrencySwap - Settings - TextField`, () => {
  const TEST_STR = 'HelloWorld!';
  const TEST_NUM = 42;

  it('should render', () => {
    shallow(getComponent());
  });

  it('should update its value accordingly when the input is changed', async () => {
    const { container } = render(getComponent());
    const input = container.querySelector('input');

    input && fireEvent.change(input, { target: { value: TEST_STR } });

    expect(input?.value).toEqual(TEST_STR);
  });

  it('should only accept numbers when type is "number"', async () => {
    const inputComponent = getComponent({
      type: 'number',
    });

    const { container } = render(inputComponent);
    const input = container.querySelector('input');

    input && fireEvent.change(input, { target: { value: TEST_STR } });
    expect(input?.value).toEqual('');

    input && fireEvent.change(input, { target: { value: TEST_NUM } });
    expect(input?.value).toEqual(TEST_NUM.toString());
  });

  it('should ', async () => {
    const TEST_VALUE = '1.123456';

    const inputComponent = getComponent({
      type: 'number',
      customInput: {
        type: 'number',
        max: 2,
        min: 1,
      },
    });

    const { container } = render(inputComponent);
    const input = container.querySelector('input');

    input && fireEvent.change(input, { target: { value: TEST_VALUE } });
    expect(input?.value).toEqual(TEST_VALUE.toString());
  });

  it(`should update the value only after ${DEFAULT_DEBOUNCE_DELAY}ms when debouncing is enabled`, async () => {
    const mockedOnChangeCb = jest.fn();

    const wrapper = mount(
      getComponent({
        debounce: true,
        onChange: mockedOnChangeCb,
      })
    );

    await act(async () => {
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: TEST_STR } });
      expect(mockedOnChangeCb).not.toBeCalled();

      await new Promise((res) =>
        setTimeout(() => {
          expect(mockedOnChangeCb).toBeCalledTimes(1);
          return res(true);
        }, DEFAULT_DEBOUNCE_DELAY + 100)
      );
    });
  });

  it(`should instantly update the value after when debouncing is disabled`, async () => {
    const mockedOnChangeCb = jest.fn();

    const wrapper = mount(
      getComponent({
        onChange: mockedOnChangeCb,
      })
    );

    await act(async () => {
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: TEST_STR } });
      setTimeout(() => expect(mockedOnChangeCb).toBeCalled(), 15);
    });
  });
});
