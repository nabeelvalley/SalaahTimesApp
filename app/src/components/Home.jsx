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
          suburb: masjid.Suburb,
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
              : '',
            jummahAthaan: masjid.JummahAthaan
              ? this.getDisplayTime(masjid.JummahAthaan)
              : '',
            jummahKhutbah: masjid.JummahKhutbah
              ? this.getDisplayTime(masjid.JummahKhutbah)
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
          },
          info: {
            notices: masjid.Notices || '',
            zuhrSalaahSpecial: masjid.ZuhrSalaahSpecial
              ? this.getDisplayTime(masjid.ZuhrSalaahSpecial)
              : '',
            zuhrAthaanSpecial: masjid.ZuhrAthaanSpecial
              ? this.getDisplayTime(masjid.ZuhrAthaanSpecial)
              : '',
            zuhrLabelSpecial: masjid.ZuhrLabelSpecial || ''
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
          .replace(/ /g, '')
          .includes(this.props.searchTerm.toLowerCase().replace(/ /g, '')) ||
        location.address
          .toLowerCase()
          .replace(/ /g, '')
          .includes(this.props.searchTerm.toLowerCase().replace(/ /g, '')) ||
        location.suburb
          .toLowerCase()
          .replace(/ /g, '')
          .includes(this.props.searchTerm.toLowerCase().replace(/ /g, ''))
    )
  }

  getDisplayTime = time => {
    // debugger
    const newTime = (time[0] === '0' ? time.slice(1) : time).toLowerCase()
    return newTime
  }

  getNormalizedTimes() {
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
    let times = this.getNormalizedTimes()
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
    let times = this.getNormalizedTimes()
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

  amPmConvert(time) {
    const hours = time.split(':')[0]
    const minutes = time.split(':')[1]

    const convertedTime =
      hours < 12
        ? `${hours === 0 ? 12 : hours}:${minutes}am`
        : `${hours - 12 === 0 ? 12 : hours - 12}:${minutes}pm`
    const newTime = this.getDisplayTime(convertedTime)
    return newTime
  }

  getNextSalaahTime(nextSalaah) {
    const times = this.getNormalizedTimes()
    let nextSalaahTime = ''
    if (times.hasOwnProperty(nextSalaah))
      nextSalaahTime = times[nextSalaah].slice(0, 5)
    return nextSalaahTime
  }

  render() {
    const times = this.getNormalizedTimes()
    const currentSalaah = this.getCurrentSalaah()
    const nextSalaah = this.getNextSalaah()

    let nextSalaahTime = this.getNextSalaahTime(nextSalaah)

    let renderedNext =
      times && this.state.localData && this.state.localData.timings ? (
        <NextPrayer salaah={nextSalaah} time={nextSalaahTime} />
      ) : null

    let yourLocation =
      times && this.state.localData && this.state.localData.timings ? (
        <MasjidTimes
          key='yourLocationTimes'
          details={{
            name: 'Your Area',
            fajr: {
              salaah: times.fajr ? this.amPmConvert(times.fajr.slice(0, 5)) : ''
            },
            zuhr: {
              salaah: times.zuhr ? this.amPmConvert(times.zuhr.slice(0, 5)) : ''
            },
            asr: {
              salaah: times.asr ? this.amPmConvert(times.asr.slice(0, 5)) : ''
            },
            maghrib: {
              salaah: times.maghrib
                ? this.amPmConvert(times.maghrib.slice(0, 5))
                : ''
            },
            esha: {
              salaah: times.esha ? this.amPmConvert(times.esha.slice(0, 5)) : ''
            }
          }}
          currentSalaah={currentSalaah}
        />
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
        {!this.props.searchTerm ? renderedNext : null}
        {!this.props.searchTerm ? yourLocation : null}
        {renderedTimes}
        <div className='notice'>
          if you would like to add your times to this page please get in touch
          with us on{' '}
          <a
            href='https://www.facebook.com/PtaMasaajidSalaahTimes'
            target='_blank'
            rel='noopener noreferrer'
          >
            facebook
          </a>
        </div>
      </div>
    )
  }
}

export default Home
