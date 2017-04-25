import React, { Component } from 'react';

export default class TotalCount extends Component {

    // static propTypes = {
    //     PRODUCTS: React.PropTypes.object,
    // };

    render() {
        return (
            <h6>Total to Purchase: <b id="priceTotal">${Math.round(this.props.total * 100) / 100}</b></h6>
        )
    }
}