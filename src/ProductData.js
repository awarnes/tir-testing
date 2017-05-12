import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

export default class ProductData extends Component {
  constructor (props) {
    super(props)

    this.handleOnBuyChange = this.handleOnBuyChange.bind(this)
  }

  handleOnBuyChange (e) {
    let value = !this.props.isBuying[this.props.product.name]
    let key = this.props.product.name
    let price = this.props.product.price
    this.props.onBuyInput(key, value, price)
  }
  renderInputForEditing (isEditing, value, name, type) {
    if (isEditing) {
      return (
        <input
          type='text'
          defaultValue={value}
          id={`${name}${type}`}
                  />
      )
    } else {
      return (
          value
      )
    }
  }

  render () {
    let name
    let stockedColor = this.props.product.stocked ? 'black' : 'red'

    if (this.props.isEditing) {
      name = this.props.product.name
    } else {
      name = <span style={{color: stockedColor}}>
        {this.props.product.name}
      </span>
    }
    let amIBuying = this.props.isBuying[this.props.product.name] || false
    return (
      <tr style={{background: this.props.bgColor}}>
        <td width='7px'>
          <Button
            data-buying={amIBuying}
            id={'checkbox' + this.props.checkboxId}
            onClick={this.handleOnBuyChange}
          >Buy Me!</Button>
        </td>
        <td style={{color: stockedColor}}>
          {this.renderInputForEditing(this.props.isEditing, name, name, 'Name')}
        </td>
        <td id='productPrice'>{this.renderInputForEditing(this.props.isEditing, this.props.product.price, name, 'Price')}</td>
      </tr>
    )
  }
}

ProductData.propTypes = {
  product: PropTypes.object,
  onBuyInput: PropTypes.func,
  isBuying: PropTypes.object,
  checkboxId: PropTypes.number,
  bgColor: PropTypes.string,
  isEditing: PropTypes.bool
}
