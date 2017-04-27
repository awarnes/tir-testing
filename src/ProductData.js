import React, { Component, PropTypes } from 'react'

export default class ProductData extends Component {
  constructor (props) {
    super(props)

    this.handleOnBuyChange = this.handleOnBuyChange.bind(this)
  }

  handleOnBuyChange (e) {
    let value = e.target.checked
    let key = this.props.product.name
    let price = this.props.product.price
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

    let amIChecked = this.props.isBuying[this.props.product.name] || false
    return (
      <tr>
        <td width='7px'>
          <input
            type='checkbox'
            checked={amIChecked}
            id={'checkbox' + this.props.checkboxId}
            onChange={this.handleOnBuyChange}
                        />
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
  checkboxId: PropTypes.number
}
