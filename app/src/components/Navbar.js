import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar z-depth-2 bottom-sticky orange accent-2">
        <NavLink to={'/'} className="waves-effect waves-orange btn-flat btn">
          Masjid Directory
        </NavLink>
        {this.props.default_location ? (
          <NavLink
            to="/mytimes"
            className="waves-effect waves-orange btn-flat btn"
          >
            Home Masjid
          </NavLink>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    default_location: state.default_location
  }
}

export default connect(mapStateToProps)(Navbar)
