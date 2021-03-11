import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { configure, shallow } from 'enzyme';
import { ProtocolSelector } from '..';
import { activeProtocols } from './mocks';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('ProtocolSelector component', () => {
  it('should render', () => {
    shallow(<ProtocolSelector list={activeProtocols} />);
  });

  it('should not have any accessibility issues', async () => {
    const { container } = render(<ProtocolSelector list={activeProtocols} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
