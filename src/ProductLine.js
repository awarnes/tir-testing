import React, { Component } from 'react';

export default class ProductLine extends Component {

    // static propTypes = {
    //     PRODUCTS: React.PropTypes.object,
    // };

    render() {
        return (
            <tr><td colSpan='2'>{this.props.category}</td></tr>
        )
    }
}