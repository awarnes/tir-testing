import React, { Component } from 'react'
import './App.css'
import { Grid, Jumbotron, Row, Col, Panel, Well, PageHeader, Button } from 'react-bootstrap'

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
      catalog: [],
      isEditing: false
    }

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this)
    this.handleInStockInput = this.handleInStockInput.bind(this)
    this.onBuyInput = this.onBuyInput.bind(this)
    this.onSaveClick = this.onSaveClick.bind(this)
    this.onEditClick = this.onEditClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
    this.renderEditButtons = this.renderEditButtons.bind(this)
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

  renderEditButtons (editing) {
    if (editing) {
      return (
        <div>
          <Button
            onClick={this.onSaveClick}>
            Save</Button>
          <Button
            onClick={this.onCancelClick}>
          Cancel</Button>
        </div>
      )
    } else {
      return (
        <Button
          onClick={this.onEditClick}>
          Edit
        </Button>
      )
    }
  }

  onEditClick () {
    this.setState({isEditing: true})
  }

  onCancelClick () {
    this.setState({isEditing: false})
  }

  onSaveClick () {
    this.state.catalog.forEach((product, index) => {
      let name = document.getElementById(`${product.name}Name`)
      let price = document.getElementById(`${product.name}Price`)
      if (name.value !== product.name) {
        let updatedCatalog = Object.assign(this.state.catalog[index], {name: name.value})
        this.setState({catalog: [updatedCatalog]})
      }

      if (Number(price.value) !== product.price) {
        let updatedCatalog = Object.assign(this.state.catalog[index], {price: Number(price.value)})
        this.setState({catalog: [updatedCatalog]})
      }
    })

    let info = {
      method: 'PUT',
      body: JSON.stringify(this.state.catalog)}

    fetch(`${SERVER_ROOT}/catalog.json`, info)
        .then((response) => {
          return response.json()
        })
        .then((catalog) => {
          this.setState({catalog})
          this.setState({isEditing: false})
        })
        .catch((error) => {
          console.log(error)
        })
  }

  componentWillMount () {
    fetch(`${SERVER_ROOT}/catalog.json`)
        .then((response) => {
          return response.json()
        })
        .then((catalog) => {
          this.setState({catalog})
        })
        .catch((error) => {
          console.log(error)
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
                  isEditing={this.state.isEditing}
          />

                <Well>
                  <TotalCount
                    products={this.state.catalog}
                    total={this.state.total}
              />
                </Well>
              </Panel>
              <Panel bsStyle='info'>
                {this.renderEditButtons(this.state.isEditing)}
              </Panel>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
