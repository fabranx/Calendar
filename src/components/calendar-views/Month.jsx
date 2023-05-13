import './Month.css'
import { useEffect } from 'react'
import { formatOpt } from '../../dateFormats'


const CELLS = 42

function Month({
  events, selectedDate, weekDayNames, setDateInterval, eventClickHandler
}) {

  const firstWeekday = selectedDate.startOf('month').weekday

  const startDay = selectedDate.startOf('month').minus({days: firstWeekday-1})

  useEffect(() => {
    setDateInterval(selectedDate.toFormat(`${formatOpt.monthStr} ${formatOpt.year}`))
  }, [selectedDate])

  const daysList =  Array.from({length: CELLS}).map((_, i) =>
    {
      let curr_date = startDay.plus({days:i})

      let eventElement = null
      const dayEvent = events?.[curr_date.year]?.[curr_date.month]?.[curr_date.day]
      if(dayEvent) {
        eventElement = <p className='month-event-title'>{dayEvent.length} {dayEvent.length > 1 ? 'eventi' : 'evento'}</p>
      }

      return (
        <div 
          key={i} 
          className={`month-view-day 
            ${curr_date.month != selectedDate.month  ? 'disabled' : ''}
            ${dayEvent ? 'month-event' : ''}
          `}
          date={curr_date}
          onClick={dayEvent ? () => eventClickHandler(curr_date) : null}
        >
          <p>{curr_date.day}</p>
          {eventElement}
        </div>
      ) 
    }
  )

  return (
    <>
      <div className='month-weekdays'>
        {weekDayNames.map(day => 
          <div key={day}>{day}</div>  
        )}
      </div>
      <div className='month-view'>
          {...daysList}
      </div>
    </>
  )
}

export default Month