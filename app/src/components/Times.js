import React, { Component } from 'react'
import Preloader from './Preloader'
import { NavLink } from 'react-router-dom'

class Times extends Component {
  componentDidMount() {}

  state = {
    times: null,
    default_location: null,
    title: 'Salaah Times'
  }

  componentDidMount() {
    const today = new Date()
    const day = today.getDay() // 1 is monday
    const month = today.getMonth() + 1 // 0 is january
    const date = today.getDate() // same as actual date

    const location_key = this.props.match.params.location_key

    console.log(location_key)

    if (location_key)
      fetch(`/api/times/${location_key}`)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          const times = json
          // this.setState({ times: times })
        })
        .catch(err => {
          console.error(err)
          window.alert('Failed to load Salaah times, please refresh the page')
        })
  }

  render() {
    let content
    if (!this.state.times) content = <Preloader />
    return (
      <div className="Home container">
        <h4 className="center-align orange-text text-accent-2">
          {this.state.title}
        </h4>
        {content}
      </div>
    )
  }
}

export default Times
