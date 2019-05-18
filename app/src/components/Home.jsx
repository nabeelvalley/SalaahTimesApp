import React, { Component } from 'react'
import NextPrayer from './NextPrayer'

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
        name: 'Eldoraigne Musallah',
        address: 'Willem Botha Str',
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
      }
    ]

    // fetch real data here

    const now = new Date()

    const request = new Request({
      method: 'POST'
    })

    var response = {}

    fetch(
      `http://api.aladhan.com/v1/calendarByAddress?address=Pretoria South Africa&month=${now.getMonth() +
        1}&year=${now.getFullYear}`,
      request
    )
      .then(res => res.json())
      .then(json => {
        response = json.data[now.getDate() - 1]
        console.log('times for location:', response)
      })

    this.setState({
      ...this.state,
      localData: response
    })
  }

  render() {
    return (
      <div className='Home'>
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
        <NextPrayer salaah='maghrib' time='5:33' />
      </div>
    )
  }
}

export default Home
