import React, { Component, PropTypes } from 'react'

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
    e.target.parentElement.style = {background: 'aliceblue'}
    this.props.onBuyInput(key, value, price)
  }

  render () {
    var name = this.props.product.stocked
            ? <span style={{color: 'black'}}>
              {this.props.product.name}
            </span>
            : <span style={{color: 'red'}}>
              {this.props.product.name}
            </span>

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
        <td>
          {name}
        </td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
}

ProductData.propTypes = {
  product: PropTypes.object,
  onBuyInput: PropTypes.func,
  isBuying: PropTypes.object,
  checkboxId: PropTypes.number,
  bgColor: PropTypes.string
}
