import './Week.css'
import { useEffect } from 'react'
import { formatOpt } from '../../dateFormats'


const CELLS = 7

function Week({
  events, 
  selectedDate, 
  weekDayNames, 
  setDateInterval,
  eventClickHandler
}) {

  const weekday = selectedDate.startOf('week').weekday

  const startDay = selectedDate.startOf('week').minus({days: weekday-1})

  useEffect(() => {
    setDateInterval(
      selectedDate.startOf('week').toFormat(`${formatOpt.fullDateStr}`)
      + ' - ' +
      selectedDate.endOf('week').toFormat(`${formatOpt.fullDateStr}`)
    )
  }, [selectedDate])


  const daysList = Array.from({length: CELLS}).map((_,i) => {
    let curr_date = startDay.plus({days:i})

    let eventElement = null
    const dayEvent = events?.[curr_date.year]?.[curr_date.month]?.[curr_date.day]
    if(dayEvent) {
      eventElement = <p className='week-event-title'>{dayEvent.length} {dayEvent.length > 1 ? 'eventi' : 'evento'}</p>
    }

    return (
      <div 
        key={i} 
        className={`week-view-day ${dayEvent ? 'week-event' : ''}`} 
        onClick={dayEvent ? () => eventClickHandler(curr_date) : null}
      >
        <p>{`${curr_date.toFormat(formatOpt.day)}/${curr_date.toFormat(formatOpt.monthNum)}`}</p>
        {eventElement}
      </div>
    ) 
  })

  return (
    <>
      <div className='week-weekdays'>
        {weekDayNames.map(day => 
          <div key={day}>{day}</div>  
        )}
      </div>

      <div className='week-view'>
        {...daysList}
      </div>
    </>
  )
}

export default Week