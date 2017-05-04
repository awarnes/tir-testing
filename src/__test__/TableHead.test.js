/* global
  it
  beforeEach
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
  let wrapper

  beforeEach(() => {
    // callback = jest.fn()

    wrapper = shallow(<TableHead
      products={PRODUCTS}
      filterText='ball'
      inStockOnly={false}
        // onBuyInput={this.onBuyInput}
      isBuying={{Football: true}}
          />)
  })

  it('pass', () => {
    expect(wrapper.unrendered.props.inStockOnly).toEqual(false)
  })

  it('pass', () => {
    expect(wrapper.unrendered.props.isBuying['Football']).toEqual(true)
  })

  it('pass', () => {
    expect(wrapper.unrendered.props.filterText).toEqual('ball')
  })
})
