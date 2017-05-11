
import React, { Component } from 'react'
import './App.css'
import { Grid, Jumbotron, Row, Col, Panel, Well, PageHeader } from 'react-bootstrap'

import SearchBar from './SearchBar'
import TableHead from './TableHead'
import TotalCount from './TotalCount'

/* global fetch */

const SERVER_ROOT = 'https://tir-inventory.firebaseio.com'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false,
      isBuying: {},
      total: 0,
      catalog: []
    }

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this)
    this.handleInStockInput = this.handleInStockInput.bind(this)
    this.onBuyInput = this.onBuyInput.bind(this)
  }

  handleFilterTextInput (filterText) {
    this.setState({
      filterText: filterText
    })
  }

  handleInStockInput (inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  onBuyInput (key, value, price) {
    let newIsBuying = Object.assign(this.state.isBuying, {[key]: value})
    let newTotal

    if (value) {
      newTotal = this.state.total + price
    } else {
      newTotal = this.state.total - price
    }

    this.setState({
      total: newTotal,
      isBuying: newIsBuying
    })
  }

  componentWillMount () {
    fetch(`${SERVER_ROOT}/catalog.json`)
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          this.setState({catalog: json})
        })
        .catch((err) => {
          console.log(err)
        })
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Jumbotron bsStyle='success'>
              <PageHeader>
                Buys our stuffs 'n' things!
              </PageHeader>
              <Panel bsStyle='info'>
                <SearchBar
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                  onFilterTextInput={this.handleFilterTextInput}
                  onInStockInput={this.handleInStockInput}
            />

                <TableHead
                  products={this.state.catalog}
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                  onBuyInput={this.onBuyInput}
                  isBuying={this.state.isBuying}
          />

                <Well>
                  <TotalCount
                    products={this.state.catalog}
                    total={this.state.total}
              />
                </Well>
              </Panel>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
