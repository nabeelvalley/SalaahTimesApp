import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preloader from './Preloader'
import { NavLink } from 'react-router-dom'

class Times extends Component {
  setLocationTimes = (key, times) => {
    this.props.setLocationTimes(key, times)
  }

  setCurrentLocation = location => {
    console.log(location)
    this.props.setCurrentLocation(location)
  }

  componentDidMount() {
    const today = new Date()
    const day = today.getDay() // 1 is monday
    const month = today.getMonth() + 1 // 0 is january
    const date = today.getDate() // same as actual date

    const location_key = this.props.match.params.location_key

    if (location_key) {
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

      fetch(`/api/index/${location_key}`)
        .then(res => res.json())
        .then(json => this.setCurrentLocation(json))
    }
  }

  render() {
    console.log(this.props)
    let content =
      this.props.times && this.props.location_info ? (
        <div>
          {' '}
          <h4 className="center-align orange-text text-accent-2">
            {this.props.location_info.name}
          </h4>
        </div>
      ) : (
        <div>
          {' '}
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
  const location_key = ownState.match.params.location_key

  return {
    default_location: state.default_location,
    times: state.times[location_key],
    location_info: state.current_location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocationTimes: (key, times) =>
      dispatch({ type: 'SET_LOCATION_TIMES', key, times }),
    setCurrentLocation: location => dispatch({ type: 'SET_CURRENT_LOCATION', location })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Times)
