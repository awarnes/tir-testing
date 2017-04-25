import React, { Component } from 'react';

export default class SearchBar extends Component {

    // static propTypes = {
    //     filterText: React.PropTypes.string,
    //     inStockOnly: React.PropTypes.bool,
    // };

    constructor(props) {
        super(props);

        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    id="filter-text"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <br/>
                <input
                    type="checkbox"
                    id="filter-checkbox"
                    checked={this.props.inStockOnly}
                    onChange={this.handleInStockInputChange}/>
                {' '}
                Only show products in stock.
            </form>
        )
    }
}