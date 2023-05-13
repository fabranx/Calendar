import './Day.css'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { formatOpt } from '../../dateFormats'

import EditModal from '../modals/EditModal'
import { deleteEvent } from '../../eventsOperations'

function Day({events, selectedDate, weekDayNames, setDateInterval, setEvents}) {
  
  useEffect(() => {
    setDateInterval(selectedDate.toFormat(`${formatOpt.fullDateStr}`))
  }, [selectedDate])


  const editModalRef = useRef(null)
  const [editEventIndex, setEditEventIndex] = useState(null)

  function editEvent(i) {
    setEditEventIndex(i)
    showEditModal()
  }

  function showEditModal() {
    if(editModalRef) {
      editModalRef.current.showModal()
    }
  }

  function handleDeleteEvent(index) {
    setEvents((prev) => {
      let new_events = deleteEvent(prev, selectedDate, index)
      return new_events
    })
  }

  const weekday = selectedDate.weekday
  const dayEvent = events?.[selectedDate.year]?.[selectedDate.month]?.[selectedDate.day]
  let eventElement = null

  if(dayEvent) {
    eventElement = <>
      <h4 className='day-event-title'>{dayEvent.length} {dayEvent.length > 1 ? 'eventi' : 'evento'}</h4>
      <ul className='day-events-list'>
        { dayEvent.map((event, i) =>
            <li key={i}>
              <div className='day-event'>
                <p>{event}</p>
                <div className='day-event-buttons'>
                  <button onClick={() => editEvent(i)} className='day-event-edit-button'>
                    <FontAwesomeIcon icon={faEdit}/>  
                  </button>
                  <button onClick={() => handleDeleteEvent(i)} className='day-event-delete-button'>
                    <FontAwesomeIcon icon={faTrashCan}/>  
                  </button>
                </div>
              </div>  
            </li>
          )
        }
      </ul>
    </>
  }

  return (
    <>
      <div className='day-view'>
        <p>{weekDayNames[weekday-1] + ' ' + selectedDate.toFormat(`${formatOpt.day}`)}</p>
        {eventElement}
      </div>
      {dayEvent ? 
        <EditModal 
          editModalRef={editModalRef} 
          setEvents={setEvents} 
          selectedDate={selectedDate}
          event={dayEvent[editEventIndex]}
          editEventIndex={editEventIndex}
        /> 
        : null
      }

    </>
  )
}

export default Day