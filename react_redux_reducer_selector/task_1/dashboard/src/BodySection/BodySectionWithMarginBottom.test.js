import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom', () => {
  test('renders BodySection and passes props correctly', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find(BodySection)).toHaveLength(1);

    const bodySection = wrapper.find(BodySection);

    expect(bodySection.prop('title')).toEqual('test title');
    expect(bodySection.prop('children').type).toEqual('p');
    expect(bodySection.prop('children').props.children).toEqual(
      'test children node'
    );
  });
});
