import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TotalCount extends Component {
  render () {
    return (
      <h6>Total to Purchase: <b id='priceTotal'>${Math.round(this.props.total * 100) / 100}</b></h6>
    )
  }
}

TotalCount.propTypes = {
  total: PropTypes.number
}
