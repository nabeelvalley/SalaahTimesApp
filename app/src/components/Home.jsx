import React, { Component } from 'react'
import NextPrayer from './NextPrayer'
import MasjidTimes from './MasjidTimes'

class Home extends Component {
  state = {
    salaahTimes: [],
    localData: {}
  }

  componentDidMount() {
    const salaahTimes = [
      {
        name: 'Eldo Meadows Musallah',
        address: 'Cnr Saxby and Weirda Rd',
        fajr: {
          athaan: '5:25am',
          salaah: '5:40am'
        },
        zuhr: {
          athaan: '1:00pm',
          salaah: '1:15pm'
        },
        asr: {
          athaan: '4:30pm',
          salaah: '4:45pm'
        },
        maghrib: {
          athaan: '5:33pm'
        },
        esha: {
          athaan: '7:00pm',
          salaah: '7:15pm'
        }
      },
      {
        name: 'Abu Bakr Siddique',
        address: 'Cnr van Leenhof and van den Heever',
        fajr: {
          athaan: '5:25am',
          salaah: '5:40am'
        },
        zuhr: {
          athaan: '1:00pm',
          salaah: '1:15pm'
        },
        maghrib: {
          athaan: '5:33pm'
        },
        esha: {
          athaan: '7:00pm',
          salaah: '7:15pm'
        }
      },
      {
        name: 'Eldoraigne Musallah',
        address: 'Willem Botha Str',
        zuhr: {
          athaan: '1:00pm',
          salaah: '1:15pm'
        },
        asr: {
          athaan: '4:30pm',
          salaah: '4:45pm'
        },
        maghrib: {
          athaan: '5:33pm',
          salaah: '5:36pm'
        },
        esha: {
          athaan: '7:00pm',
          salaah: '7:15pm'
        }
      }
    ]

    // fetch real data here

    const now = new Date()

    const request = new Request({
      method: 'POST'
    })

    fetch(
      `http://api.aladhan.com/v1/calendarByAddress?address=Pretoria South Africa&month=${now.getMonth() +
        1}&year=${now.getFullYear}`,
      request
    )
      .then(res => res.json())
      .then(json => {
        let localData = json.data[now.getDate() - 1]
        console.log(localData)
        this.setState({ ...this.state, localData })
      })

    this.setState({
      ...this.state,
      salaahTimes
    })
  }

  render() {
    let now = new Date()

    let times = {}

    if (this.state.localData && this.state.localData.timings) {
      times.fajr = this.state.localData.timings.Fajr
      times.zuhr = this.state.localData.timings.Dhuhr
      times.asr = this.state.localData.timings.Asr
      times.maghrib = this.state.localData.timings.Maghrib
      times.esha = this.state.localData.timings.Isha
    }

    let currentSalaah = ''

    for (const salaah in times) {
      if (times.hasOwnProperty(salaah)) {
        const time = times[salaah].slice(0, 5)
        let salaahTime = new Date(
          `${now.getMonth()}/${now.getDate()}/${now.getFullYear()} ${time}`
        )

        currentSalaah = salaah.toLowerCase()
        if (salaahTime > now) {
          break
        }
      }
    }

    let filteredTimes = this.state.salaahTimes.filter(
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

    let renderedTimes = filteredTimes.map((details, index) =>
      currentSalaah && details ? (
        <MasjidTimes
          key={index}
          details={details}
          currentSalaah={currentSalaah}
        />
      ) : null
    )

    let nextSalaah = ''

    for (const salaah in times) {
      if (times.hasOwnProperty(salaah)) {
        const time = times[salaah].slice(0, 5)
        let salaahTime = new Date(
          `${now.getMonth()}/${now.getDate()}/${now.getFullYear()} ${time}`
        )

        if (salaahTime > now) {
          nextSalaah = salaah.toLowerCase()
          break
        }
      }
    }

    if (!nextSalaah) nextSalaah = 'fajr'
    let nextSalaahTime = ''
    if (times.hasOwnProperty(nextSalaah))
      nextSalaahTime = times[nextSalaah].slice(0, 5)

    let renderedNext = times ? (
      <NextPrayer salaah={nextSalaah} time={nextSalaahTime} />
    ) : null

    return (
      <div className='Home'>
        {renderedNext}
        {renderedTimes}
      </div>
    )
  }
}

export default Home
