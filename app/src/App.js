import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getCookie, setCookie } from './helpers/cookieManager'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Times from './components/Times'

class App extends Component {
  state={
    default_location: null
  }

  makeDefaultLocation = key => {
    setCookie('DEFAULT_LOCATION', key)
    this.setState({ default_location: getCookie('DEFAULT_LOCATION') })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar default_location={this.state.default_location} />
          <Switch>
            <Route exact path="/" default_location={this.state.default_location} makeDefaultLocation={this.makeDefaultLocation} component={Home} />
            <Route path="/times/:location_key" default_location={this.state.default_location} component={Times} />
            <Route component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
