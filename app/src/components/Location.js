import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Location extends Component {
  setDefaultLocation = () => {
    this.props.setDefaultLocation(this.props.location.key)
  }

  render() {
    const location = this.props.location

    const location_area = location.area ? <p>{location.area}</p> : null
    const location_address = location.address ? <p>{location.address}</p> : null

    const make_default =
      location.key === this.props.default_location ? (
        <NavLink
          to={`/times/${location.key}`}
          className="waves-effect waves-orange btn-flat"
          disabled
        >
          Default Selected
        </NavLink>
      ) : (
        <button
          onClick={this.setDefaultLocation}
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

const mapStateToProps = state => {
  return {
    default_location: state.default_location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDefaultLocation: key => dispatch({ type: 'SET_DEFAULT_LOCATION', key })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)
