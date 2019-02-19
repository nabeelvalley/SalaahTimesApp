import React, { Component } from 'react'
import {connect} from 'react-redux'
import Location from './Location'
import Preloader from './Preloader'

class Home extends Component {
  state = {
    index_list: []
  }

  setIndexes = (indexes) => {
    this.props.setIndexes(indexes)
  }

  componentDidMount() {
    fetch('/api/index')
      .then(res => res.json())
      .then(json => this.setIndexes(json))
      .catch(err => {
        console.error(err)
        window.alert('Failed to load list of Masaajid, please refresh the page')
      })
  }

  render() {
    const content = this.props.indexes.length ? (
      this.props.indexes.map(location => (
        <Location
          location={location}
          key={location.key}
        />
      ))
    ) : (
      <Preloader />
    )

    return (
      <div className="Home container">
        <h4 className="center-align orange-text text-accent-2">Masjid Directory</h4>
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    default_location: state.default_location,
    indexes: state.indexes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setIndexes: indexes => dispatch({ type: 'SET_INDEXES', indexes })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

