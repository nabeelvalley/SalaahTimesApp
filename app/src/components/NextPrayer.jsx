import React, { Component } from 'react'

const NextPrayer = ({ salaah, time }) => (
  <div className='NextPrayer'>
    <div className='title'>Next Prayer</div>
    <div className='name'>{salaah}</div>
    <div className='time'>{time}</div>
  </div>
)

export default NextPrayer
