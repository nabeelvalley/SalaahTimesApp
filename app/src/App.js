import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Times from './components/Times'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              path="/times/:location_key"
              component={Times}
            />
            <Route component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    default_location: state.default_location
  }
}

export default connect(mapStateToProps)(App)
