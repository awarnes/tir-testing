/* global
  it
  describe
  expect
 */

import React from 'react'
import ProductLine from '../ProductLine'
import {shallow} from 'enzyme'

describe('ProductLine', () => {
  it('renders a category correctly', () => {
    let wrapper = shallow(
      <ProductLine
        category='Apple'
        key='2'
            />
        )

    expect(wrapper.unrendered.props.category).toEqual('Apple')
  })
})
