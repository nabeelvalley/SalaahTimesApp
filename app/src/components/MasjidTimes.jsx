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
    const selectedTimes = this.props.details[this.state.currentTab]

    const pills = ['fajr', 'zuhr', 'asr', 'maghrib', 'esha'].map(salaah =>
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

    const renderInfo =
      this.props.details.info &&
      (this.props.details.info.notices ||
        ((this.props.details.info.zuhrSalaahSpecial ||
          this.props.details.info.zuhrAthaanSpecial) &&
          this.props.details.info.zuhrLabelSpecial))

    const info = renderInfo ? (
      <div
        key='info'
        onClick={() =>
          this.setState({
            ...this.state,
            currentTab: 'info',
            tabChanged: true
          })
        }
        className={
          'pill ' + (this.state.currentTab === 'info' ? '-selected' : '')
        }
      >
        i
      </div>
    ) : null

    pills.push(info)

    let text

    if (selectedTimes.athaan || selectedTimes.salaah)
      text = (
        <div className='times'>
          {selectedTimes.athaan ? (
            <div className='athaan'>Athaan: {selectedTimes.athaan}</div>
          ) : null}
          {selectedTimes.salaah ? (
            <div className='salaah'>Salaah: {selectedTimes.salaah}</div>
          ) : null}
        </div>
      )
    else if (renderInfo)
      text = (
        <div className='info'>
          {this.props.details.info.zuhrLabelSpecial &&
          (this.props.details.info.zuhrAthaanSpecial ||
            this.props.details.info.zuhrSalaahSpecial) ? (
            <div>
              {this.props.details.info.zuhrLabelSpecial ? (
                <p>{'Zuhr ' + this.props.details.info.zuhrLabelSpecial}</p>
              ) : null}
              {this.props.details.info.zuhrAthaanSpecial ? (
                <p>{'Athaan: ' + this.props.details.info.zuhrAthaanSpecial}</p>
              ) : null}
              {this.props.details.info.zuhrSalaahSpecial ? (
                <p>{'Salaah: ' + this.props.details.info.zuhrSalaahSpecial}</p>
              ) : null}
              <br />
              {this.props.details.info.notices
                ? this.props.details.info.notices
                    .split('\n')
                    .map((line, index) =>
                      line.length > 0 ? (
                        <p key={index}>{line}</p>
                      ) : (
                        <br key={index} />
                      )
                    )
                : null}
            </div>
          ) : null}
        </div>
      )
    else
      text = (
        <div className='times'>
          <div className='salaah'>no times for {this.state.currentTab}</div>
        </div>
      )

    return (
      <div className='MasjidTimes'>
        <div className='name'>{this.props.details.name}</div>
        <div className='address'>
          {this.props.details.address}
          {this.props.details.suburb ? `, ${this.props.details.suburb}` : ''}
        </div>
        <div className='pills'>{pills}</div>
        {text}
      </div>
    )
  }
}

export default MasjidTimes
