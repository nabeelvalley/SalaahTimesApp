import React from 'react'

const NoticeContent = ({ info }) => (
  <div className='NoticeContent'>
    {info.zuhrLabelSpecial &&
    (info.zuhrAthaanSpecial || info.zuhrSalaahSpecial) ? (
      <div>
        {info.zuhrLabelSpecial ? (
          <p className='bold'>{'Zuhr ' + info.zuhrLabelSpecial}</p>
        ) : null}
        {info.zuhrAthaanSpecial ? (
          <p>{'Athaan: ' + info.zuhrAthaanSpecial}</p>
        ) : null}
        {info.zuhrSalaahSpecial ? (
          <p>{'Salaah: ' + info.zuhrSalaahSpecial}</p>
        ) : null}
        <br />
        {info.notices
          ? info.notices
              .split('\n')
              .map((line, index) =>
                line.length > 0 ? <p key={index}>{line}</p> : <br key={index} />
              )
          : null}
      </div>
    ) : null}
  </div>
)

export default NoticeContent
