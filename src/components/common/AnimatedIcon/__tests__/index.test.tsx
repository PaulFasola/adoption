import React from 'react';
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { AnimatedIcon, IconType } from '..';

configure({ adapter: new Adapter() });

describe(`AnimatedIcon`, () => {
  it('Should render', () => {
    Object
      .keys(IconType)
      .forEach((key) => shallow(
        <AnimatedIcon type={IconType[key]} />
      ));
  });

  it('Should be styleable', () => {
    const wrapper = shallow(<AnimatedIcon type={IconType.Sucess} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});