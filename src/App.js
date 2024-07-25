import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
    console.log(filteredCartList)

    this.setState({
      cartList: filteredCartList,
    })
  }

  decreaseCartItemCount = id => {
    const {cartList} = this.state

    const decreasedCartList = cartList.map(eachItem => {
      if (eachItem.id === id && eachItem.quantity > 1) {
        return {...eachItem, quantity: eachItem.quantity - 1}
      }

      return eachItem
    })

    this.setState({
      cartList: decreasedCartList,
    })
  }

  increaseCartItemCount = id => {
    const {cartList} = this.state

    const increasedCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }

      return eachItem
    })

    this.setState({
      cartList: increasedCartList,
    })
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decreaseCartItemCount: this.decreaseCartItemCount,
          increaseCartItemCount: this.increaseCartItemCount,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
