import '../index.css'
import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Home from '../components/Home'
import Header from '../components/Header'

class Index extends Component {
  state = {
    searchTerm: ''
  }

  handleSearch = searchTerm => {
    this.setState({
      ...this.state,
      searchTerm
    })
  }

  render() {
    return (
      <div className='App'>
        <Header
          searchTerm={this.state.searchTerm}
          handleChange={this.handleSearch}
        />
        <Home data={this.props.data.strapi.masjids} searchTerm={this.state.searchTerm} />
      </div>
    )
  }
}

export default Index

export const query = graphql`
query AllMasjidData {
    strapi {
      masjids {
        Address
        AsrAthaan
        AsrSalaah
        EshaAthaan
        EshaSalaah
        FajrAthaan
        FajrSalaah
        JummahAthaan
        JummahKhutbah
        MaghribAthaan
        MaghribSalaah
        Name
        Notices
        Suburb
        ZuhrAthaanSpecial
        ZuhrAthaan
        ZuhrLabelSpecial
        ZuhrSalaah
        ZuhrSalaahSpecial
        id
        updatedAt
        _id
        createdAt
        area {
          Name
          _id
          createdAt
          id
          updatedAt
        }
      }
    }
  }
  
`
