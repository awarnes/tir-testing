/* global
  it
  describe
  expect
  beforeEach
  jest
 */

import React from 'react'
import ProductData from '../ProductData'
import {shallow} from 'enzyme'

describe('ProductData', () => {
  let wrapper, callback

  beforeEach(() => {
    callback = jest.fn()
    wrapper = shallow(
      <ProductData
        bgColor='aliceblue'
        price={121}
        product={{category: 'electronics', stocked: false, name: 'apple', price: 121}}
        onBuyInput={callback}
        isBuying={{}}
            />
        )
  })

  it('button receives the correct information', () => {
    const inputObject = wrapper.find('Button')
    inputObject.simulate('click', {})

    expect(callback.mock.calls).toEqual([['apple', true, 121]])
  })

  it('renders product names in red if out of stock', () => {
    const name = wrapper.find('span')
    expect(name.node.props.style.color).toEqual('red')
  })

  it('renders product names in black if in stock', () => {
    const wrapper = shallow(
      <ProductData
        price={121}
        product={{category: 'electronics', stocked: true, name: 'apple', price: 121}}
        onBuyInput={callback}
        isBuying={{}}
            />
        )
    const name = wrapper.find('span')
    expect(name.node.props.style.color).toEqual('black')
  })

  it('renders the correct price', () => {
    const price = wrapper.find('#productPrice').text()
    expect(price).toEqual('121')
  })
})
