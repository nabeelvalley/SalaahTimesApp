import React, { Component } from 'react'

class Home extends Component {
  state = {
    index_list: [],
    localData: {}
  }

  componentDidMount() {
    // fetch real data here

    const now = new Date()

    const request = new Request({
      method: 'POST'
    })

    var response = {};

    fetch(`http://api.aladhan.com/v1/calendarByAddress?address=Pretoria South Africa&month=${now.getMonth() + 1}&year=${now.getFullYear}`, request)
      .then(res => res.json())
      .then(json => {
        response = json.data[now.getDate() - 1]
        console.log('times for location:', response)
      })

    this.setState({
      ...this.state, localData: response
    })
  }

  render() {
    return (
      <div className="Home container">

      </div>
    )
  }
}

export default Home

