import React, { Component } from 'react'
import Home from './components/Home'
import Header from './components/Header'

class App extends Component {
  state = {
    searchTerm: ''
  }

  handleSearch = searchTerm => {
    this.setState({
      ...this.state,
      searchTerm
    })
  }

  render() {
    return (
      <div className='App'>
        <Header
          searchTerm={this.state.searchTerm}
          handleChange={this.handleSearch}
        />
        <Home searchTerm={this.state.searchTerm} />
      </div>
    )
  }
}

export default App
