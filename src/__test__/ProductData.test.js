import React from 'react'
import ReactDOM from 'react-dom'
import ProductData from '../ProductData'
import {shallow} from 'enzyme'
// import {renderer} from 'react-test-renderer' for snapshot testing renderer.create

describe('ProductData', () => {
    let wrapper, callback, pd

    beforeEach(() => {
        callback = jest.fn()
        wrapper = shallow(
            <ProductData
                price={121}
                product={{category : 'electronics', stocked: false, name: 'apple', price: 121}}
                onBuyInput={callback}
                isBuying={{}}
            />
        )

    })

    it('checkbox receives the correct information', () => {

        const inputObject = wrapper.find('input')
        inputObject.simulate('change', {target: {checked: true}})

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
                product={{category : 'electronics', stocked: true, name: 'apple', price: 121}}
                onBuyInput={callback}
                isBuying={{}}
            />
        )
        const name = wrapper.find('span')
        expect(name.node.props.style.color).toEqual('black')
    })

    it('renders the correct price', () => {
        const price = wrapper.node.props.children[1]
        expect(price.props.children).toEqual(121)
    })

})