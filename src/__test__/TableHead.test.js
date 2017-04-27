/* global
  it
  beforeEach
  jest
  describe
  expect
 */

import React from 'react'
import TableHead from '../TableHead'
import {shallow} from 'enzyme'

const PRODUCTS = [
  {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7'}
]

describe('TableHead', () => {
  let callback, wrapper//, thInstance

  beforeEach(() => {
    callback = jest.fn()

    wrapper = shallow(<TableHead
      filterText='ball'
      inStockOnly={false}
      onBuyInput={callback}
      // isBuying={false}
      products={PRODUCTS}
            />)

    // thInstance = wrapper.instance()
  })

  it('pass', () => {
    expect(wrapper.unrendered.props.inStockOnly).toEqual(false)
  })
})
