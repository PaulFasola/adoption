import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { IProps } from '../fieldBuilder';
import { RadioField } from '../radioField';
import { act } from 'react-dom/test-utils';
import { DEFAULT_DEBOUNCE_DELAY } from '../../constants';

import 'jest-styled-components';

//jest.setTimeout(30000);

configure({ adapter: new Adapter() });

const RADIO_VALUES = ['0.1%', '0.5%', '1%', '2%'];

const getComponent = (props?: Partial<IProps>) => (
  <RadioField value={RADIO_VALUES} {...props} type='radio' name='test' label='test' />
);

describe(`CurrencySwap - Settings - RadioField`, () => {
  it('should render', () => {
    shallow(getComponent());
  });

  it(`should update the value only after ${DEFAULT_DEBOUNCE_DELAY}ms when debouncing is enabled`, async () => {
    const mockedOnChangeCb = jest.fn();

    const { container } = render(
      getComponent({
        debounce: true,
        onChange: mockedOnChangeCb,
      })
    );

    container.querySelector<HTMLLabelElement>('label[for="item-1"]')?.click();

    await act(async () => {
      expect(mockedOnChangeCb).not.toBeCalled();

      await new Promise((res) =>
        setTimeout(() => {
          expect(mockedOnChangeCb).toBeCalled();
          return res(true);
        }, DEFAULT_DEBOUNCE_DELAY + 100)
      );
    });
  });

  it(`should instantly update the value after when debouncing is disabled`, async () => {
    const mockedOnChangeCb = jest.fn();

    const { container } = render(
      getComponent({
        debounce: false,
        onChange: mockedOnChangeCb,
      })
    );

    container.querySelector<HTMLLabelElement>('label[for="item-1"]')?.click();

    await act(async () => {
      await new Promise((res) => {
        setTimeout(() => {
          expect(mockedOnChangeCb).toBeCalled();
          return res(true);
        }, 15);
      });
    });
  });

  it(`should warn the developer when the provided value isn't handled`, async () => {
    const originalWarn = console.warn;
    const consoleOutput: string[] = [];
    const mockedWarn = (output: string) => consoleOutput.push(output);
    console.warn = mockedWarn;

    render(
      getComponent({
        value: { 'this will not work': 'should not*' },
      })
    );

    console.warn = originalWarn;
    expect(consoleOutput.length).toEqual(1);
    expect(consoleOutput[0].indexOf('is not an array')).toBeGreaterThan(-1);
  });
});
