import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProductLine extends Component {
  render () {
    return (
      <tr><td colSpan='2'>{this.props.category}</td></tr>
    )
  }
}

ProductLine.propTypes = {
  category: PropTypes.string
}
