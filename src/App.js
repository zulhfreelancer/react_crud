import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    var products;
    if (localStorage.getItem("products") == null) {
      products = []
    } else {
      products = JSON.parse( localStorage.getItem("products") )
    }

    this.state = {
      products: products
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount() {
    var products = this.getProducts();
    this.setState({ products });
  }

  saveToLocalStorage(data) {
    localStorage.setItem("products", JSON.stringify(data));
  }

  getProducts() {
    return this.state.products;
  }

  onAdd(name, price) {
    var products = this.getProducts();
    products.push({
      name: name,
      price: price
    })
    this.setState({ products });
    this.saveToLocalStorage(products);
  }

  onEditSubmit(name, price, originalName) {
    var products = this.getProducts();
    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }
      return product;
    });
    this.setState({products});
    this.saveToLocalStorage(products);
  }

  onDelete(name) {
    console.log(name);
    var products = this.getProducts();
    var filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    console.log(filteredProducts);
    this.setState({products: filteredProducts});
    this.saveToLocalStorage(filteredProducts);
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>

        <AddProduct
          onAdd = {this.onAdd}
        />

        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key   = {product.name}
                {...product}
                onDelete = {this.onDelete}
                onEditSubmit = {this.onEditSubmit}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
