import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Board from '../../src/components/Board';

function setup() {
  const props = {
    squareSize: 64,
    actions: {},
    path: [],
    tiles: [],
  };

  const component = shallow(
    <Board {...props} />
  );

  return {
    component,
  };
}

describe('Board component', () => {
  it('should render', () => {
    const { component } = setup();
    expect(component.hasClass('Board')).to.equal(true);
  });
});
