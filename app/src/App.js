import React, { Component } from 'react'
import Home from './components/Home'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    )
  }
}



export default App
