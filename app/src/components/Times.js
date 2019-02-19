import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preloader from './Preloader'
import Salaah from './Salaah'

class Times extends Component {
  setLocationTimes = (key, times) => {
    this.props.setLocationTimes(key, times)
  }

  setCurrentLocation = location => {
    this.props.setCurrentLocation(location)
  }

  componentDidMount() {
    const location_key = this.props.match.params.location_key
    if (location_key) {
      fetch(`/api/index/${location_key}`)
        .then(res => res.json())
        .then(json => this.setCurrentLocation(json))
      fetch(`/api/times/${location_key}`)
        .then(res => res.json())
        .then(json => {
          const times = json
          this.setLocationTimes(location_key, times)
        })
        .catch(err => {
          console.error(err)
          window.alert('Failed to load Salaah times, please refresh the page')
        })
    }
  }

  render() {
    const location = this.props.location_info
    let times
    if (this.props.times && location) {
      const today = new Date()
      const day = today.getDay() // 1 is monday
      const month = today.getMonth() + 1 // 0 is january
      const date = today.getDate() // same as actual date

      times = this.props.times.find(
        time => time.month === month && time.day === date
      )
    }
    const content =
      this.props.times && location ? (
        <div>
          <h4 className="center-align orange-text text-accent-2">
            {location.name}
          </h4>
          <div className="Salaah card">
            <div className="card-content">
              <Salaah
                name="Fajr"
                athan={times.fajr_athan}
                salaah={times.fajr_salaah}
              />
              <Salaah
                name="Zuhr"
                athan={times.zuhr_athan}
                salaah={times.zuhr_salaah}
              />
              <Salaah
                subtitle="Weekends and public holidays"
                athan={times.zohr_athan_special}
                salaah={times.zohr_salaah_special}
              />
              <Salaah
                name="Jummah"
                athan={times.jummah_athan}
                salaah={times.jummah_salaah}
                khutbah={times.jummah_khutbah}
              />
              <Salaah
                name="Asr"
                athan={times.asr_athan}
                salaah={times.asr_salaah}
              />
              <Salaah
                name="Maghrib"
                athan={times.magrib_athan}
                salaah={times.magrib_salaah}
              />
              <Salaah
                name="Esha"
                athan={times.isha_athan}
                salaah={times.isha_salaah}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="center-align orange-text text-accent-2">
            Salaah Times
          </h4>
          <Preloader />
        </div>
      )

    return <div className="Home container">{content}</div>
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    default_location: state.default_location,
    times: state.times[state.default_location],
    location_info: state.current_location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocationTimes: (key, times) =>
      dispatch({ type: 'SET_LOCATION_TIMES', key, times }),
    setCurrentLocation: location =>
      dispatch({ type: 'SET_CURRENT_LOCATION', location })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Times)
