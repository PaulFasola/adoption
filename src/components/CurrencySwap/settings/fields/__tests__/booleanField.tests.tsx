import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import { BooleanField } from '../booleanField';
import { DEFAULT_DEBOUNCE_DELAY } from '../../constants';
import { IProps } from '../fieldBuilder';
import { act } from 'react-dom/test-utils';

import 'jest-styled-components';

configure({ adapter: new Adapter() });

const getComponent = (props?: Partial<IProps>) => (
  <BooleanField {...props} name='test' label='test' type='boolean' />
);

describe(`CurrencySwap - Settings - BooleanField`, () => {
  it('should render', () => {
    shallow(getComponent());
  });

  it('should have its "checked" property to "false" by default', async () => {
    const { container } = render(getComponent());
    const input = container.querySelector('input');

    expect(input).not.toBeChecked();
  });

  it('should have its "checked" property to "true" after a click on the component.', async () => {
    const { container } = render(getComponent());
    const input = container.querySelector('input');

    input?.click();

    expect(input).toBeChecked();
  });

  it(`should update the value only after ${DEFAULT_DEBOUNCE_DELAY}ms when debouncing is enabled`, async () => {
    const mockedOnChangeCb = jest.fn();

    const component = getComponent({
      debounce: true,
      label: 'test',
      onChange: mockedOnChangeCb,
    });

    const { container } = render(component);
    const input = container.querySelector('input');

    await act(async () => {
      input?.click();
      expect(mockedOnChangeCb).not.toBeCalled();

      await new Promise((res) =>
        setTimeout(() => {
          expect(mockedOnChangeCb).toBeCalledTimes(1);
          return res(true);
        }, DEFAULT_DEBOUNCE_DELAY + 100)
      );
    });
  });

  it(`should instantly update the value when debouncing is disabled`, async () => {
    const mockedOnChangeCb = jest.fn();

    const component = getComponent({
      onChange: mockedOnChangeCb,
    });

    const { container } = render(component);
    const input = container.querySelector('input');

    await act(async () => {
      input?.click();
      setTimeout(() => expect(mockedOnChangeCb).toBeCalled(), 15);
    });
  });
});
