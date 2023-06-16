import './Day.css'
import { useEffect, useRef, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { formatOpt } from '../../dateFormats'
import { LoginContext } from '../../context'
import EditModal from '../modals/EditModal'
import { deleteEvent } from '../../eventsOperations'
import { client } from '../../api-client'

function Day({events, selectedDate, weekDayNames, setDateInterval, setEvents, editEventMutation, deleteEventMutation}) {
  
  useEffect(() => {
    setDateInterval(selectedDate.toFormat(`${formatOpt.fullDateStr}`))
  }, [selectedDate])


  const editModalRef = useRef(null)
  const [editEventIndex, setEditEventIndex] = useState(null)
  const {isLoggedIn} = useContext(LoginContext)


  function handleEditEvent(i) {
    setEditEventIndex(i)
    showEditModal()
  }

  function showEditModal() {
    if(editModalRef) {
      editModalRef.current.showModal()
    }
  }

  function handleDeleteEvent(index, id) {
    if(isLoggedIn) {
      deleteEventMutation.mutate({
        token: client.token,
        username: client.username,
        id: id
      })
    }
    else {
      setEvents((prev) => {
        let new_events = deleteEvent(prev, selectedDate, index)
        return new_events
      })
    }

  }

  const weekday = selectedDate.weekday
  const dayEvents = events?.[selectedDate.year]?.[selectedDate.month]?.[selectedDate.day]
  let eventElement = null

  if(dayEvents) {
    eventElement = <>
      <h4 className='day-event-title'>{dayEvents.length} {dayEvents.length > 1 ? 'eventi' : 'evento'}</h4>
      <ul className='day-events-list'>
        { dayEvents.map((event, i) =>
            <li key={i}>
              <div className='day-event'>
                <p>{event.description}</p>
                <div className='day-event-buttons'>
                  <button onClick={() => handleEditEvent(i)} className='day-event-edit-button'>
                    <FontAwesomeIcon icon={faEdit}/>  
                  </button>
                  <button onClick={() => handleDeleteEvent(i, event.id)} className='day-event-delete-button'>
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
      {dayEvents ? 
        <EditModal 
          editModalRef={editModalRef} 
          setEvents={setEvents} 
          selectedDate={selectedDate}
          event={dayEvents[editEventIndex] ? dayEvents[editEventIndex] : ''}
          editEventIndex={editEventIndex}
          editEventMutation={editEventMutation}
        /> 
        : null
      }

    </>
  )
}

export default Day