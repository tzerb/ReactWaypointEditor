import React from 'react';
import TestUtils, {createRenderer, Simulate} from 'react-addons-test-utils';
import expect from 'expect';
import Header from './Header';
import {mount, shallow} from 'enzyme';

describe('Header', () => {
  // Note how with shallow render you search for the
  // React component tag
  it('contains 3 Links via shallow', () => {
    // arrange
    const numLinks = shallow(<Header loading={false} />).find('Link').length;

    // assert
    expect(numLinks).toEqual(3);
  });

  // Note how with mount you search for the final
  // rendered HTML since it generates the final DOM.
  it('contains 4 anchors via mount', () => {
    // arrange
    const numAnchors = mount(<Header loading={false} />).find('a').length;

    // assert
    expect(numAnchors).toEqual(4);
  });

  it('contains no links with active class by default', () => {
    const linksWithActiveClass = shallow(<Header loading={false} />).find('.active');
    expect(linksWithActiveClass.length).toEqual(0);
  });
});
