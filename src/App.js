import React, { Component } from 'react';
import './App.css';

import SearchBar from './SearchBar'
import TableHead from './TableHead'
import TotalCount from './TotalCount'

const PRODUCTS = [
  {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7'}
];


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
            isBuying: {},
            total: 0,
        };

    }

    handleFilterTextInput(filterText){
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    onBuyInput(key, value, price) {
        let newIsBuying = Object.assign(this.state.isBuying, {[key]: value})
        let newTotal;

        if (value){
            newTotal = this.state.total + price;
        } else {
            newTotal = this.state.total - price;
        }

        this.setState({
            total: newTotal,
            isBuying: newIsBuying,
        })
    }

    render() {
    return (
      <main>
          <SearchBar
              filterText={this.state.filterText}
              inStockOnly={this.state.inStockOnly}
              onFilterTextInput={this.handleFilterTextInput.bind(this)}
              onInStockInput={this.handleInStockInput.bind(this)}
          />

          <TableHead
              products={PRODUCTS}
              filterText={this.state.filterText}
              inStockOnly={this.state.inStockOnly}
              onBuyInput={this.onBuyInput.bind(this)}
              isBuying={this.state.isBuying}
          />

          <TotalCount
              products={PRODUCTS}
              total={this.state.total}
              />
      </main>
    );
  }
}

export default App;
