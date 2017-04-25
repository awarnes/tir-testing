import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import {mount, shallow} from 'enzyme';

"use strict";

describe('integration test',() => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    describe('when filtering products', () => {
        let app

        beforeEach(() => {
            app = mount(<App />)
        })

        it('renders the correct number of table rows without filters', () => {

            expect(app.find('tr').length).toBe(9)

        })

        it('will filter out of stock items when inStock checked', () => {

            const event = {target: {checked: true}}

            expect(app.find('tr').length).toBe(9)

            app.find('#filter-checkbox').simulate('change', event)

            expect(app.find('tr').length).toBe(7)

        })

        it('correctly re-renders the DOM when the filter text box is typed in', () => {

            const event = {target: {value: 'k'}}

            let originalRows = app.find('tr').length

            expect(originalRows).toBe(9)

            app.find('#filter-text').simulate('change', event)
            let newRows = app.find('tr').length

            expect(newRows).not.toEqual(originalRows)

        })

        it('renders the correct number of rows when both filters are active', () => {

            const checkEvent = {target: {checked: true}}
            const textEvent = {target: {value: 'ball'}}

            app.find('#filter-text').simulate('change', textEvent)
            app.find('#filter-checkbox').simulate('change', checkEvent)

            expect(app.find('tr').length).toBe(5)

        })
    });

    describe('checking product items', () => {

        let app

        beforeEach(() => {
            app = mount(<App />)
        })

        it('renders zero when nothing is checked', () => {

            expect(app.find('#priceTotal').text()).toBe('$0')

        })

        it('renders correctly when basketball is clicked once', () => {

            let event = {target: {checked: true}}
            app.find('#checkbox2').simulate('change', event)
            expect(app.find('#priceTotal').text()).toBe('$29.99')

        })

        it('renders correcly when basketball is clicked twice', () => {

            let checkOn = {target: {checked: true}}
            let checkOff = {target: {checked: false}}

            const basketballCheck = app.find('#checkbox2')

            basketballCheck.simulate('change', checkOn)
            basketballCheck.simulate('change', checkOff)

            expect(app.find('#priceTotal').text()).toBe('$0')

        })

        it('adds values together properly', () => {

            let checkEvent = {target: {checked: true}}

            app.find('#checkbox1').simulate('change', checkEvent)
            app.find('#checkbox2').simulate('change', checkEvent)
            app.find('#checkbox4').simulate('change', checkEvent)
            app.find('#checkbox5').simulate('change', checkEvent)

            expect(app.find('#priceTotal').text()).toBe('$639.96')

        })

        // it('subtracts price when the product is no longer showing', () => {
        //
        //     let checkEvent = {target: {checked: true}}
        //
        //     app.find('#checkbox2').simulate('change', checkEvent)
        //
        //     expect(app.find('#priceTotal').text()).toBe('$29.99')
        //
        //     app.find('#filter-checkbox').simulate('change', checkEvent)
        //
        //     expect(app.find('#priceTotal').text()).toBe('$0')
        //
        // })

    })

})