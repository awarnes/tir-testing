import React, { Component } from 'react';

import ProductLine from './ProductLine.js'
import ProductData from './ProductData.js'

export default class TableHead extends Component {

    // static propTypes = {
    //     filterText: React.PropTypes.string,
    //     inStockOnly: React.PropTypes.bool,
    //     onBuyInput: React.PropTypes.func,
    //     isBuying: React.PropTypes.object,
    // };

    render() {

        let rows = [];
        let lastCategory = null;
        let filterText = this.props.filterText;
        let inStockOnly = this.props.inStockOnly;
        let onBuyInput = this.props.onBuyInput;
        let isBuying = this.props.isBuying;

        let keyIterator = 0
        let checkboxIdIterator = 0

        this.props.products.forEach(function(product){

            if (product.category !== lastCategory){
                rows.push(<ProductLine category={product.category} key={product.category+keyIterator} />);
                keyIterator++
            }

            lastCategory = product.category;

            if (product.name.indexOf(filterText) !== -1) {
                if (inStockOnly && product.stocked) {
                    rows.push(<ProductData
                                product={product}
                                key={product.name+product.category}
                                onBuyInput={onBuyInput}
                                isBuying={isBuying}
                                checkboxId={checkboxIdIterator}
                                />);
                    checkboxIdIterator++
                } else if (inStockOnly && !product.stocked) {
                    return
                } else {
                    rows.push(<ProductData
                                    product={product}
                                    key={product.name+product.category}
                                    onBuyInput={onBuyInput}
                                    isBuying={isBuying}
                                    checkboxId={checkboxIdIterator}
                                />);
                    checkboxIdIterator++
                }
            }
        });

        return (
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>

                    <tbody>{rows}</tbody>

                </table>
            </section>
        )

    }

}