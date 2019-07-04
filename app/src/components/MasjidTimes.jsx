import React, { Component } from 'react'

class MasjidTimes extends Component {
  state = {
    currentTab: '',
    tabChanged: false
  }

  constructor(props) {
    super(props)
    this.state.currentTab = props.currentSalaah
  }

  static getDerivedStateFromProps(props, state) {
    const currentTab = state.tabChanged ? state.currentTab : props.currentSalaah
    return { ...state, currentTab, tabChanged: false }
  }

  render() {
    let selectedTimes = this.props.details[this.state.currentTab]

    let pills = ['fajr', 'zuhr', 'asr', 'maghrib', 'esha'].map(salaah =>
      this.props.details[salaah] &&
      (this.props.details[salaah].salaah ||
        this.props.details[salaah].athaan) ? (
        <div
          key={salaah}
          onClick={() =>
            this.setState({
              ...this.state,
              currentTab: salaah,
              tabChanged: true
            })
          }
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
          {!(selectedTimes.athaan || selectedTimes.salaah) ? (
            <div className='salaah'>no jama'ah for {this.state.currentTab}</div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default MasjidTimes
