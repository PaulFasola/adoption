import React from 'react';
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { AdaptiveSpan } from '..';

configure({ adapter: new Adapter() });

describe('AdaptiveSpan Component', () => {
  it('should renders', () => {
    const wrapper = shallow(<AdaptiveSpan text="Foobar" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should apply general styling correctly', () => {
    const boldSpan = shallow(<AdaptiveSpan text="Foobar" style="bold" />);
    expect(toJson(boldSpan)).toMatchSnapshot();

    const wrapper = shallow(<AdaptiveSpan text="Foobar" style="italic" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should replace a tag accordingly', () => {
    const wrapper = shallow(<AdaptiveSpan text="Foo{test}" mapping={[{ tag: '{test}', value: 'bar' }]} />);
    expect(wrapper.html()).toEqual('<span title=\"Foobar"\>Foobar</span>');
  });

  it('should replace occurencies matching tags defined in mapping property correctly', () => {
    const wrapper = shallow(<AdaptiveSpan text="{test1} is not {test2}, but {test1} is {test1}" mapping={[{ tag: '{test1}', value: 'foo' }, { tag: '{test2}', value: 'bar' }]} />);
    expect(wrapper.html()).toEqual('<span title=\"foo is not bar, but foo is foo\">foo is not bar, but foo is foo</span>');
  });

  it('should replace occurencies and apply the requested styles', () => {
    const wrapper = shallow(<AdaptiveSpan
      text="{test1} is not {test2}, and {test2} is not {test3}."
      mapping={[
        { tag: '{test1}', value: 'foo', style: 'bold' },
        { tag: '{test2}', value: 'bar', style: 'italic' },
        { tag: '{test3}', value: 'foobar' }
      ]} />);
    expect(wrapper.html()).toEqual('<span title=\"foo is not bar, and bar is not foobar.\"><b>foo</b> is not <i>bar</i>, and <i>bar</i> is not foobar.</span>');
  });
});