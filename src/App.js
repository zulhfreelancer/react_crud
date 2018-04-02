import React, { Component } from 'react';
import logo from './logo.svg';
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
      products: []
    };
  }

  componentWillMount() {
    this.getProducts();
  }

  getProducts() {
    var products = JSON.parse( localStorage.getItem("products") );
    this.setState({ products });
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>

        {
          this.state.products.map(product => {
            return (
              <div key={product.name}>
                <span>{product.name}</span> <span>{product.price}</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
