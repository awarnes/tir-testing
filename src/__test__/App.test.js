import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import {shallow} from 'enzyme'

describe('App', () => {
    "use strict";
    describe('onBuyInput', () => {
        let app, wrapper
        beforeEach(() =>{
            wrapper = shallow(<App />)
            app = wrapper.instance()
        })

        it('properly increments price', () => {
            app.onBuyInput('product1', true, 299.99)
            expect(app.state.isBuying).toEqual({'product1': true})
            expect(app.state.total).toEqual(299.99)
        })

        it('properly decrements price', () => {
            wrapper.setState({total: 299.99})
            app.onBuyInput('product1', false, 299.99)
            expect(app.state.isBuying).toEqual({'product1': false})
            expect(app.state.total).toEqual(0)
        })

    })
})