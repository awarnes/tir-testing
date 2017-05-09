/* global
  it
  describe
  expect
  beforeEach
  jest
 */

import React from 'react'
import SearchBar from '../SearchBar'

import {shallow} from 'enzyme'

describe('SearchBar', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()

    wrapper = shallow(<SearchBar
      filterText={'ball'}
      inStockOnly={false}
      onFilterTextInput={callback}
      onInStockInput={callback}
            />)
  })

  it('checkbox passes information correctly...', () => {
    let checkbox = wrapper.find('#filter-checkbox')
    checkbox.simulate('change', {target: {checked: true}})
    expect(callback.mock.calls).toEqual([[true]])
  })

  it('text-box passes information correctly...', () => {
    let textBox = wrapper.find('#filter-text')
    textBox.simulate('change', {target: {value: 'balls'}})
    expect(callback.mock.calls).toEqual([['balls']])
  })
})
