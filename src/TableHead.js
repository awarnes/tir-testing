import React, { Component, PropTypes } from 'react'
import { Table } from 'react-bootstrap'

import ProductLine from './ProductLine.js'
import ProductData from './ProductData.js'

let bgColor

export default class TableHead extends Component {
  render () {
    let rows = []
    let lastCategory = null
    let filterText = this.props.filterText
    let inStockOnly = this.props.inStockOnly
    let onBuyInput = this.props.onBuyInput
    let isBuying = this.props.isBuying

    let keyIterator = 0
    let checkboxIdIterator = 0

    this.props.products.forEach(function (product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductLine category={product.category} key={product.category + keyIterator} />)
        keyIterator++
      }

      lastCategory = product.category

      if (product.name.indexOf(filterText) !== -1) {
        if (inStockOnly && product.stocked) {
          console.log(isBuying[product.name])
          if (isBuying[product.name]) {
            bgColor = '#ff69b4'
          } else {
            bgColor = ''
          }
          rows.push(<ProductData
            bgColor={bgColor}
            product={product}
            key={product.name + product.category}
            onBuyInput={onBuyInput}
            isBuying={isBuying}
            checkboxId={checkboxIdIterator}
                                />)
          checkboxIdIterator++
        } else if (inStockOnly && !product.stocked) {

        } else {
          console.log(isBuying[product.name])
          if (isBuying[product.name]) {
            bgColor = '#ff69b4'
          } else {
            bgColor = ''
          }
          rows.push(<ProductData
            bgColor={bgColor}
            product={product}
            key={product.name + product.category}
            onBuyInput={onBuyInput}
            isBuying={isBuying}
            checkboxId={checkboxIdIterator}
                                />)
          checkboxIdIterator++
        }
      }
    })

    return (
      <section>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>

        </Table>
      </section>
    )
  }
}

TableHead.propTypes = {
  filterText: PropTypes.string,
  inStockOnly: PropTypes.bool,
  onBuyInput: PropTypes.func,
  isBuying: PropTypes.object,
  products: PropTypes.array
}
