import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, shallow } from 'enzyme';
import { ProtocolSelector } from '..';
import { activeProtocols } from './mocks';

import 'jest-styled-components';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('ProtocolSelector component', () => {
  it('should render', () => {
    shallow(<ProtocolSelector list={activeProtocols} />);
  });

  it('should should make the dropdown appear when clicking on the button', () => {
    const { container } = render(<ProtocolSelector list={activeProtocols} />);

    const button = container.querySelector('button') as HTMLButtonElement;
    button?.click();

    expect(container.querySelector('div[data-test="dropdown"]')).toHaveStyle({
      'max-height': '10rem',
    });
  });

  it('should close the dropdown if the button is clicked again', () => {
    const { container } = render(<ProtocolSelector list={activeProtocols} />);

    const button = container.querySelector('button') as HTMLButtonElement;
    act(() => {
      button?.click();
    });

    act(() => {
      button?.click();
    });

    expect(container.querySelector('div[data-test="dropdown"]')).toHaveStyle({ 'max-height': '0' });
  });

  it('should close the dropdown if an inner element is selected', () => {
    const { container } = render(<ProtocolSelector list={activeProtocols} />);

    const button = container.querySelector('button') as HTMLButtonElement;
    const dropdown = container.querySelector('div[data-test="dropdown"]');

    // Two times, because we also need to cover the button when a protocol is already selected.
    for (let i = 0; i < 2; i++) {
      button?.click();
      dropdown?.querySelector('div')?.click();
    }

    expect(dropdown).toHaveStyle({ 'max-height': '0' });
  });

  it('should close the dropdown upon outer click', () => {
    const { container } = render(
      <>
        <h2>test</h2>
        <ProtocolSelector list={activeProtocols} />
      </>
    );

    act(() => {
      const button = container.querySelector('button') as HTMLButtonElement;
      button?.click();
    });

    act(() => {
      container.querySelector('h2')?.click();
    });

    expect(container.querySelector('div[data-test="dropdown"]')).toHaveStyle({ 'max-height': '0' });
  });

  it('should trigger onChange event when an item is clicked', () => {
    const onChangeFn = jest.fn();
    const { container } = render(<ProtocolSelector list={activeProtocols} onChange={onChangeFn} />);

    const button = container.querySelector('button') as HTMLButtonElement;
    button?.click();

    const dropdown = container.querySelector('div[data-test="dropdown"]');
    dropdown?.querySelector('div')?.click();

    expect(onChangeFn).toHaveBeenCalled();
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(<ProtocolSelector list={activeProtocols} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
