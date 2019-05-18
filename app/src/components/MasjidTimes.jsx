import React, { Component } from 'react'

class MasjidTimes extends Component {
  state = {
    currentTab: ''
  }

  constructor({ currentSalaah }) {
    super()
    this.state.currentTab = currentSalaah
  }

  render() {
    let selectedTimes = this.props.details[this.state.currentTab]

    let pills = ['fajr', 'zuhr', 'asr', 'maghrib', 'esha'].map(salaah =>
      this.props.details[salaah] ? (
        <div
          key={salaah}
          onClick={() => this.setState({ ...this.state, currentTab: salaah })}
          className={
            'pill ' + (this.state.currentTab === salaah ? '-selected' : '')
          }
        >
          {salaah}
        </div>
      ) : null
    )

    return (
      <div className='MasjidTimes'>
        <div className='name'>{this.props.details.name}</div>
        <div className='address'>{this.props.details.address}</div>
        <div className='pills'>{pills}</div>
        <div className='times'>
          {selectedTimes.athaan ? (
            <div className='athaan'>Athaan: {selectedTimes.athaan}</div>
          ) : null}
          {selectedTimes.salaah ? (
            <div className='salaah'>Salaah: {selectedTimes.salaah}</div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default MasjidTimes
