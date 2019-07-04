import React, { Component } from 'react'
import NextPrayer from './NextPrayer'
import MasjidTimes from './MasjidTimes'

class Home extends Component {
  state = {
    salaahTimes: [],
    localData: {}
  }

  componentDidMount() {
    fetch('/masjids')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        var salaahTimes = json.map(masjid => ({
          name: masjid.Name,
          address: masjid.Address,
          fajr: {
            salaah: masjid.FajrSalaah
              ? this.getDisplayTime(masjid.FajrSalaah)
              : '',
            athaan: masjid.FajrAthaan
              ? this.getDisplayTime(masjid.FajrAthaan)
              : ''
          },
          zuhr: {
            salaah: masjid.ZuhrSalaah
              ? this.getDisplayTime(masjid.ZuhrSalaah)
              : '',
            athaan: masjid.ZuhrAthaan
              ? this.getDisplayTime(masjid.ZuhrAthaan)
              : ''
          },
          asr: {
            salaah: masjid.AsrSalaah
              ? this.getDisplayTime(masjid.AsrSalaah)
              : '',
            athaan: masjid.AsrAthaan
              ? this.getDisplayTime(masjid.AsrAthaan)
              : ''
          },
          maghrib: {
            salaah: masjid.MaghribSalaah
              ? this.getDisplayTime(masjid.MaghribSalaah)
              : '',
            athaan: masjid.MaghribAthaan
              ? this.getDisplayTime(masjid.MaghribAthaan)
              : ''
          },
          esha: {
            salaah: masjid.EshaSalaah
              ? this.getDisplayTime(masjid.EshaSalaah)
              : '',
            athaan: masjid.EshaAthaan
              ? this.getDisplayTime(masjid.EshaAthaan)
              : ''
          }
        }))

        this.setState({ ...this.state, salaahTimes })
      })

    const now = new Date()

    const request = new Request({
      method: 'POST'
    })

    fetch(
      `https://api.aladhan.com/v1/calendarByAddress?address=Pretoria South Africa&month=${now.getMonth() +
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

  getDisplayTime = time => (time[0] == '0' ? time.slice(0) : time).toLowerCase()

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
          currentSalaah={currentSalaah || nextSalaah}
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
