import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { activeProtocols } from '../../ProtocolSelector/__tests__/mocks';
import { configure, shallow } from 'enzyme';
import { CurrencySwap } from '..';

expect.extend(toHaveNoViolations);
configure({ adapter: new Adapter() });

describe('TokenSwap component', () => {
  it('should render', () => {
    shallow(
      <CurrencySwap
        protocols={{
          input: activeProtocols,
        }}
      />
    );
  });

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
