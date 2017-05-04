import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormControl } from 'react-bootstrap'
// import {Checkbox} from '@shopify/polaris'
export default class SearchBar extends Component {
  constructor (props) {
    super(props)

    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this)
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this)
  }

  handleFilterTextInputChange (e) {
    this.props.onFilterTextInput(e.target.value)
  }

  handleInStockInputChange (e) {
    this.props.onInStockInput(e.target.checked)
  }

  render () {
    return (
      <form>
        <FormControl
          type='text'
          value={this.props.filterText}
          placeholder='Search...'
          id='filter-text'
          onChange={this.handleFilterTextInputChange}
          />
        <br />
        <input
          type='checkbox'
          id='filter-checkbox'
          checked={this.props.inStockOnly}
          onChange={this.handleInStockInputChange}
          label='Only show products in stock.'
        />
        <br /><br />
      </form>
    )
  }
}

SearchBar.propTypes = {
  filterText: PropTypes.string,
  inStockOnly: PropTypes.bool,
  onInStockInput: PropTypes.func,
  onFilterTextInput: PropTypes.func
}
