/* global
  it
  describe
  expect
 */

import React from 'react'
import TotalCount from '../TotalCount'
import {shallow} from 'enzyme'

describe('TotalCount', () => {
  it('renders total correctly', () => {
    let wrapper = shallow(
      <TotalCount
        total={127}
            />
        )

    expect(wrapper.unrendered.props.total).toEqual(127)
  })
})
