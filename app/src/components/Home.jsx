import React, { Component } from 'react'
import NextPrayer from './NextPrayer'
import MasjidTimes from './MasjidTimes'

class Home extends Component {
  state = {
    salaahTimes: [],
    localData: {}
  }

  componentDidMount() {
    fetch('/api/times')
      .then(res => res.json())
      .then(json => {
        var salaahTimes = json.map(masjid => ({
          name: masjid.name,
          address: masjid.address,
          fajr: {
            salaah: masjid.fajrSalaah,
            athaan: masjid.fajrAthaan
          },
          zuhr: {
            salaah: masjid.zuhrSalaah,
            athaan: masjid.zuhrAthaan
          },
          asr: {
            salaah: masjid.asrSalaah,
            athaan: masjid.asrAthaan
          },
          maghrib: {
            salaah: masjid.maghribSalaah,
            athaan: masjid.maghribAthaan
          },
          esha: {
            salaah: masjid.eshaSalaah,
            athaan: masjid.eshaAthaan
          }
        }))

        this.setState({ ...this.state, salaahTimes })
      })

    const now = new Date()

    const request = new Request({
      method: 'POST'
    })

    fetch(
      `http://api.aladhan.com/v1/calendarByAddress?address=Pretoria South Africa&month=${now.getMonth() +
        1}&year=${now.getFullYear}&school=1`,
      request
    )
      .then(res => res.json())
      .then(json => {
        let localData = json.data[now.getDate() - 1]
        console.log(localData)
        this.setState({ ...this.state, localData })
      })
  }

  filterLocations() {
    return this.state.salaahTimes.filter(
      location =>
        location.name
          .toLowerCase()
          .replace(/\ /g, '')
          .includes(this.props.searchTerm.toLowerCase().replace(/\ /g, '')) ||
        location.address
          .toLowerCase()
          .replace(/\ /g, '')
          .includes(this.props.searchTerm.toLowerCase().replace(/\ /g, ''))
    )
  }

  normalizeTimes() {
    let times = {}

    if (this.state.localData && this.state.localData.timings) {
      times.fajr = this.state.localData.timings.Fajr
      times.zuhr = this.state.localData.timings.Dhuhr
      times.asr = this.state.localData.timings.Asr
      times.maghrib = this.state.localData.timings.Maghrib
      times.esha = this.state.localData.timings.Isha
    }

    return times
  }

  getCurrentSalaah() {
    let now = new Date()
    let times = this.normalizeTimes()
    let currentSalaah = ''

    for (const salaah of ['fajr', 'zuhr', 'asr', 'maghrib', 'esha']) {
      if (times.hasOwnProperty(salaah)) {
        const time = times[salaah].slice(0, 5)
        let salaahTime = new Date(
          `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${time}`
        )

        if (now.getTime() > salaahTime.getTime()) {
          currentSalaah = salaah
        } else {
          currentSalaah = currentSalaah
        }
      }
    }

    if (!currentSalaah) currentSalaah = 'fajr'
    return currentSalaah
  }

  getNextSalaah() {
    let now = new Date()
    let times = this.normalizeTimes()
    let nextSalaah = ''

    for (const salaah of ['fajr', 'zuhr', 'asr', 'maghrib', 'esha'].reverse()) {
      if (times.hasOwnProperty(salaah)) {
        const time = times[salaah].slice(0, 5)
        let salaahTime = new Date(
          `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${time}`
        )

        if (salaahTime.getTime() < now.getTime()) {
          break
        } else {
          nextSalaah = salaah
        }
      }
    }

    if (!nextSalaah) nextSalaah = 'fajr'
    return nextSalaah
  }

  getNextSalaahTime(nextSalaah) {
    const times = this.normalizeTimes()
    let nextSalaahTime = ''
    if (times.hasOwnProperty(nextSalaah))
      nextSalaahTime = times[nextSalaah].slice(0, 5)
    return nextSalaahTime
  }

  render() {
    const now = new Date()
    const times = this.normalizeTimes()
    const currentSalaah = this.getCurrentSalaah()
    const nextSalaah = this.getNextSalaah()

    let nextSalaahTime = this.getNextSalaahTime(nextSalaah)

    let renderedNext = times ? (
      <NextPrayer salaah={nextSalaah} time={nextSalaahTime} />
    ) : null

    let filteredTimes = this.filterLocations()

    let renderedTimes = filteredTimes.map((details, index) =>
      currentSalaah && details ? (
        <MasjidTimes
          key={index}
          details={details}
          currentSalaah={currentSalaah}
        />
      ) : null
    )

    return (
      <div className='Home'>
        {renderedNext}
        {renderedTimes}
      </div>
    )
  }
}

export default Home
