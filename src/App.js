import React, { Component } from 'react';
import ProductItem from './ProductItem';
import './App.css';

var products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name: 'iPhone',
    price: 650
  }
];

localStorage.setItem("products", JSON.stringify(products));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse( localStorage.getItem("products") )
    };

    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    var products = this.getProducts();
    this.setState({ products });
  }

  getProducts() {
    return this.state.products;
  }

  onDelete(name) {
    console.log(name);
    var products = this.getProducts();
    var filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    console.log(filteredProducts);
    this.setState({products: filteredProducts});
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>

        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key   = {product.name}
                {...product}
                onDelete = {this.onDelete}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
