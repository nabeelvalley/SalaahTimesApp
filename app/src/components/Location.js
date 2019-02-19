import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Location extends Component {
  render() {
    const location = this.props.location

    const location_area = location.area ? <p>{location.area}</p> : null
    const location_address = location.address ? <p>{location.address}</p> : null

    const make_default =
      location.key === this.props.defaultLocation ? (
        <NavLink
          to={`/times/${location.key}`}
          className="waves-effect waves-orange btn-flat"
          disabled
        >
          Default Selected
        </NavLink>
      ) : (
        <button
          onClick={() => this.props.makeDefaultLocation(location.key)}
          className="waves-effect waves-orange btn-flat"
        >
          Make Default
        </button>
      )

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">{location.name}</span>
          {location_area}
          {location_address}
        </div>
        <div className="card-action">
          <NavLink
            to={`/times/${location.key}`}
            className="waves-effect waves-orange btn-flat"
          >
            View Times
          </NavLink>
          {make_default}
        </div>
      </div>
    )
  }
}

export default Location
