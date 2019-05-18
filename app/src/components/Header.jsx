import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="title">Salaah Times</h1>
        <div className="search">
          <div className="box">
            <input type="text" placeholder="Find a Masjid"></input>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
