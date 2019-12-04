import React, { Component } from 'react'
import { createEvent } from "../helpers/trackingHelper";

class Header extends Component {
  copyTimesToClipboard() {
    fetch('/masjids/export-text')
      .then(res => res.text())
      .then(text => navigator.clipboard.writeText(text))
  }

  render() {
    return (
      <header className='Header' onClick={() => this.props.handleChange('')}>
        <h1 className='title' onClick={this.copyTimesToClipboard}>
          Salaah Times
        </h1>
        <div className='search'>
          <form
            onClick={() => createEvent('searchClick', 'searchForm', 'click')}
            onSubmitCapture={e => {
              e.preventDefault()
              document.activeElement.blur()
            }}
            className='box'
          >
            <input
              aria-label='Find a Masjid'
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
