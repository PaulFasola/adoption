import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, mount, shallow } from 'enzyme';
import { Input } from '..';
import { act } from 'react-dom/test-utils';

import 'jest-styled-components';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('Input component', () => {
  it('should render', () => {
    render(
      <>
        <Input aria-label='test' type='text' label='Test' placeholder='placeholder' />
        <Input aria-label='test' type='decimal' placeholder='placeholder test' />
        <Input aria-label='test' type='number' />
      </>
    );
  });

  it('should accept any character for text input', () => {
    const testValue = 'abcABC0123@#$%^&*()/\\_';
    const wrapper = mount(<Input aria-label='text-test' type='text' value={testValue} />);

    expect(wrapper.find('input').prop('value')).toEqual(testValue);
  });

  it('should only accept numbers/decimals when type is decimal', () => {
    const testValue: string | number = 1337.42;
    const wrapper = mount(<Input aria-label='decimal-test' type='decimal' value={testValue} />);

    expect(wrapper.find('input').prop('value')).toEqual(testValue);
  });

  it('should only accept numbers when type is number', () => {
    let testValue: string | number = 42;
    const wrapper = mount(<Input aria-label='number-test' type='number' value={testValue} />);

    const inputValue = wrapper.find('input').prop('value');
    expect(inputValue).toEqual(testValue);

    testValue = 42.42;
    wrapper.setProps({ value: testValue });
    expect(inputValue).toEqual(42);

    testValue = 'shouldNotRender';
    wrapper.setProps({ value: testValue });
    expect(inputValue).toEqual(42);
  });

  it('should respect provided pattern on input', () => {
    const testValue = '10:15:20';

    // Pattern: HH:MM:SS
    const wrapper = mount(
      <Input
        aria-label='test'
        type='text'
        pattern='(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}'
        value={testValue}
      />
    );

    const inputValue = wrapper.find('input').prop('value');

    expect(inputValue).toEqual(testValue);
  });

  it('should make the label floating if label is present and the input is focused', () => {
    const wrapper = mount(
      <Input aria-label='test' type='decimal' label='Test' value={42} maximumFractionDigits={3} />
    );
    const label = wrapper.find('label');

    wrapper.find('input').simulate('focus');

    expect(label.getDOMNode()).not.toHaveStyle({ transform: 'translateY(0) scale(1)' });
  });

  it('should relocate label to its initial position on blur if nothing entered', () => {
    const wrapper = mount(<Input aria-label='test' type='text' label='Test' />);
    const label = wrapper.find('label');
    const input = wrapper.find('input');

    input.simulate('focus');
    input.simulate('blur');

    expect(label.getDOMNode()).toHaveStyle({ transform: 'translateY(0) scale(1)' });
  });

  it('should NOT relocate label to its initial position on blur when value is defined', () => {
    const wrapper = mount(<Input aria-label='test' type='text' label='Test' />);
    const label = wrapper.find('label');
    const input = wrapper.find('input');

    act(() => {
      input.simulate('focus');
      input.simulate('change', { target: { value: 'foobar' } });
    });

    act(() => {
      input.simulate('blur');
    });

    expect(label.getDOMNode()).not.toHaveStyle({ transform: 'translateY(0) scale(1)' });
  });

  it('should update input value accordingly', () => {
    const testValue = 'foo';
    const wrapper = mount(<Input aria-label='test' type='text' />);
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: testValue } });

    expect(input.getDOMNode()).toHaveValue(testValue);
  });

  it('should trigger onValueChanged when input value changed', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Input aria-label='test' type='text' onValueChange={mockFn} />);

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'foobar' } });

    expect(mockFn).toHaveBeenCalled();
  });

  it("should display a title when the input value's length > maxlength", () => {
    const wrapper = shallow(<Input aria-label='test' type='text' maxLength={2} value='foobar' />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should append the value to a pre-defined title when input's value length > maxlength", () => {
    const wrapper = shallow(
      <Input aria-label='test' type='text' maxLength={2} title='My name is foo' value='foo bar' />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not trigger onValueChanged when input value is not matching provided pattern', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <Input
        pattern='(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}'
        aria-label='test'
        type='text'
        onValueChange={mockFn}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'foobar' } });

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(
      <Input aria-label='test' type='text' label='Test' placeholder='placeholder' />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should adjust the value depending on beforeValueChange output', async () => {
    const TEST_STR = 'Value has been';

    const wrapper = mount(
      <Input
        aria-label='test'
        type='text'
        label='Test'
        placeholder='placeholder'
        beforeValueChange={(val) => `${val} intercepted!`} />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: TEST_STR } });

    expect(input.getDOMNode<HTMLInputElement>().value).toEqual(`${TEST_STR} intercepted!`);
  });

  it('should prevent a value update when beforeValueChange returns null', async () => {
    const TEST_STR = 'I will not appear';

    const wrapper = mount(
      <Input
        aria-label='test'
        type='text'
        label='Test'
        placeholder='placeholder'
        beforeValueChange={() => null} />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: TEST_STR } });

    expect(input.getDOMNode<HTMLInputElement>().value).toEqual('');
  });

});
