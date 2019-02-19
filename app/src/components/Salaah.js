import React from 'react'

const Salaah = ({ name, subtitle, salaah, athan, khutbah }) => {
  return (
    <div>
      {name ? <span className="card-title">{name}</span> : null}
      {subtitle ? <h6 className="card-subtitle">{subtitle}</h6> : null}
      <div className="times">
        <div className="prayer-time">
          <div className="name btn btn-flat">ATHAN</div>
          <div className="time btn btn-flat">{athan}</div>
        </div>
        {khutbah ? (
          <div className="prayer-time">
            <div className="name btn btn-flat">KHUTBAH</div>
            <div className="time btn btn-flat">{khutbah}</div>
          </div>
        ) : null}
        <div className="prayer-time">
          <div className="name btn btn-flat">SALAAH</div>
          <div className="time btn btn-flat">{salaah}</div>
        </div>
      </div>
    </div>
  )
}

export default Salaah
