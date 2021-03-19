import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { activeProtocols } from '../../ProtocolSelector/__tests__/mocks';
import { configure, mount, ReactWrapper, shallow } from 'enzyme';
import { CurrencySwap } from '..';
import { Overview, SwapButton } from '../style';
import { ISwapSubmission, ProtocolEnd } from '../interfaces';
import { IProtocol } from '../../ProtocolSelector/interfaces';

const SUBMIT_BUTTON_SELECTOR = 'button[aria-label="Submit"]';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

const selectProtocol = (
  wrapper: ReactWrapper,
  select: ProtocolEnd,
  protoPos: number
): ReactWrapper => {
  if (protoPos < 0) throw "Protocol DOM poisiton can't be < 0.";

  const selectPos = select === 'input' ? 0 : 1;
  const button = wrapper
    .find('button')
    .not('[aria-label="Swap values"]')
    .at(selectPos)
    .simulate('click');

  wrapper
    .find('div[data-test="dropdown"]')
    .at(selectPos)
    .find('div > div')
    .at(protoPos)
    .simulate('click');

  return button;
};

const setInputValue = (
  wrapper: ReactWrapper,
  inputEnd: ProtocolEnd,
  amount: string | number
): ReactWrapper => {
  const input = wrapper.find('input').at(inputEnd === 'input' ? 0 : 1);
  input.simulate('change', { target: { value: amount.toString() } });

  return input;
};

describe('CurrencySwap component', () => {
  it('should render', () => {
    shallow(
      <CurrencySwap
        protocols={{
          input: activeProtocols,
        }}
      />
    );
  });

  /**
   * VALIDATION LOGIC
   */
  it('should respect maxFractionDigit prop value', () => {
    shallow(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );
  });

  it('should prevent submission when', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeDisabled();
  });

  it('should prevent submission when', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeDisabled();
  });

  it('should prevent submission when', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeDisabled();
  });

  it('should render balance when an input protocol is selected', () => {
    const testValue = 42;
    activeProtocols[0].balance = testValue;

    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    selectProtocol(wrapper, 'input', 0);

    expect(wrapper.find(Overview).text()).toEqual(`Balance: ${testValue}`);
  });

  it('should render balance: 0, if balance is invalid', () => {
    activeProtocols[0].balance = -55;

    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    selectProtocol(wrapper, 'input', 0);

    expect(wrapper.find(Overview).text()).toEqual(`Balance: 0`);
  });

  it('should render price equiv when an input protocol AND an output protocol are selected', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    expect(wrapper.find(Overview).length).toEqual(0);

    selectProtocol(wrapper, 'input', 0);
    expect(wrapper.find(Overview).length).toEqual(1);

    selectProtocol(wrapper, 'output', 0);
    expect(wrapper.find(Overview).length).toEqual(2);

    expect(wrapper.find(Overview).at(1).text().replace(/\s/g, '')).toEqual('1BTC=27.8666057561ETH');
  });

  it('should still render price equiv when no decimals are set', () => {
    const activeProtos = JSON.parse(JSON.stringify(activeProtocols)) as IProtocol[];
    activeProtos[0].decimals = undefined;
    activeProtos[1].decimals = undefined;

    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtos,
        }}
      />
    );

    expect(wrapper.find(Overview).length).toEqual(0);

    selectProtocol(wrapper, 'input', 0);
    expect(wrapper.find(Overview).length).toEqual(1);

    selectProtocol(wrapper, 'output', 0);
    expect(wrapper.find(Overview).length).toEqual(2);

    expect(wrapper.find(Overview).at(1).text().replace(/\s/g, '')).toEqual('1BTC=27.86660576ETH');
  });

  it('should not be possible to select the same protocol as input and output', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    const inputProto = selectProtocol(wrapper, 'input', 0).getDOMNode() as HTMLButtonElement;
    const outputProto = selectProtocol(wrapper, 'output', 0).getDOMNode() as HTMLButtonElement;

    expect(inputProto.title).not.toEqual(outputProto.title);
  });

  /**
   * SWAP FEATURE
   */

  it('should swap values accordingly, when clicking on the swap button', () => {
    const inputInitialVal = 12345;

    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    selectProtocol(wrapper, 'input', 0);
    selectProtocol(wrapper, 'output', 0);

    const input = setInputValue(wrapper, 'input', inputInitialVal);
    wrapper.find(SwapButton).simulate('click');
    expect(input.prop('value')).not.toEqual(inputInitialVal);
  });

  /**
   * SUBMISSION
   */

  it('should submit if requirements are met', () => {
    activeProtocols[0].balance = 5;
    activeProtocols[1].balance = 10;

    const onSubmit = jest.fn((params: ISwapSubmission) => {
      expect(JSON.stringify(params)).toMatchSnapshot();
    });

    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
        onSubmit={onSubmit}
      />
    );

    selectProtocol(wrapper, 'input', 0);
    selectProtocol(wrapper, 'output', 0);
    setInputValue(wrapper, 'input', 4);

    wrapper.find(SUBMIT_BUTTON_SELECTOR).simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should allow submission when conditions are met', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    selectProtocol(wrapper, 'input', 0);
    selectProtocol(wrapper, 'output', 0);

    // sets amount to 1, that is the minimum generated balance in activeProtocols mock
    setInputValue(wrapper, 'input', 1);

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).text()).toEqual('Swap');
    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeEnabled();
  });

  it('should prevent submission if locked prop is provided', () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeDisabled();
    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).text()).toEqual('Swap');
  });

  it("should prevent sumission if balance is insufficient, submit button's value should visually reflect that", () => {
    const wrapper = mount(
      <CurrencySwap
        maxFractionDigits={10}
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    selectProtocol(wrapper, 'input', 0);
    selectProtocol(wrapper, 'input', 1);

    setInputValue(wrapper, 'input', 999999);

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeDisabled();
    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).text()).toEqual('Insufficient balance');
  });

  it('should not be possible to swap if locked prop is true', () => {
    const wrapper = mount(
      <CurrencySwap
        protocols={{
          input: activeProtocols,
        }}
        locked={true}
      />
    );

    selectProtocol(wrapper, 'input', 0);
    selectProtocol(wrapper, 'output', 0);

    // sets amount to 1, that is the minimum generated balance in activeProtocols mock
    setInputValue(wrapper, 'input', 1);

    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).text()).toEqual('Unlock Wallet');
    expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).getDOMNode()).toBeDisabled();
  });

  it('should not render incoherent prive equivalence when input price is < 0', () => {
    activeProtocols[0].price = -1;

    const wrapper = mount(
      <CurrencySwap
        protocols={{
          input: activeProtocols,
        }}
        locked={true}
      />
    );

    selectProtocol(wrapper, 'input', 0);
    selectProtocol(wrapper, 'output', 0);

    expect(wrapper.find(Overview).at(2)).toEqual({});
  });

  /**
   * ACCESSIBILITY
   */

  it('should not have any accessibility issues', async () => {
    const { container } = render(
      <CurrencySwap
        protocols={{
          input: activeProtocols,
        }}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
