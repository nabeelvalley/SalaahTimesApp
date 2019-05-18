import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className='Header' onClick={() => this.props.handleChange('')}>
        <h1 className='title'>Salaah Times</h1>
        <div className='search'>
          <form
            onSubmitCapture={e => {
              e.preventDefault()
              document.activeElement.blur()
            }}
            className='box'
          >
            <input
              onChange={event => this.props.handleChange(event.target.value)}
              type='text'
              placeholder='Find a Masjid'
              value={this.props.searchTerm}
            />
          </form>
        </div>
      </header>
    )
  }
}

export default Header
