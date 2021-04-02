import React from 'react';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow } from 'enzyme';
import { Icon, IconType } from '..';

import 'jest-styled-components';

configure({ adapter: new Adapter() });

describe(`Icon`, () => {
  it('Should render', () => {
    Object.keys(IconType).forEach((key) => shallow(<Icon type={IconType[key]} />));
  });

  it('Should be clickable when url is defined', () => {
    const wrapper = shallow(<Icon type={IconType.OutboundLink} url='https://brrr.money/' />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should be clickable when url is defined and the target should be _blank', () => {
    const wrapper = shallow(
      <Icon type={IconType.OutboundLink} url='https://brrr.money/' targetBlank />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
