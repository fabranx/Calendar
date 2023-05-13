import './Calendar.css'
import Day from './calendar-views/Day'
import Week from './calendar-views/Week'
import Month from './calendar-views/Month'
import {DateTime, Info} from 'luxon'
import { useState, useRef, useEffect } from 'react'
import AddModal from './modals/AddModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

const views = {
  MONTH: 'month',
  DAY: 'day',
  WEEK: 'week'
}

const dateNow = DateTime.now().setLocale('it')
const weekDayNames = Info.weekdays("short", {locale:'it'})


function Calendar() {

  const [selectedDate, setSelectedDate] = useState(dateNow)
  const [selectedView, setSelectedView] = useState(views.MONTH)
  const [dateInterval, setDateInterval] = useState('')
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || {}
  )
  const addModalRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])


  function eventClickHandler(date) {
    setSelectedDate(date)
    setSelectedView(views.DAY)
  }

  function showAddModal() {
    if(addModalRef) {
      addModalRef.current.showModal()
    }
  }

  return (
    <div className='calendar'>

      <div className='calendar-controls'>
        <div className='type-selection'>
          <button 
            className={`selection-button ${selectedView===views.DAY ? 'active' : ''}`} 
            onClick={() => setSelectedView(views.DAY)}>
            giorno
          </button>
          <button
            className={`selection-button ${selectedView===views.WEEK ? 'active' : ''}`}
            onClick={() => setSelectedView(views.WEEK)}>
            sett.
          </button>
          <button 
            className={`selection-button ${selectedView===views.MONTH ? 'active' : ''}`} 
            onClick={() => setSelectedView(views.MONTH)}>
            mese
          </button>
        </div>

        <div className='date-selection'>
          <button className='arrow-button' onClick={() => setSelectedDate(prevDate => prevDate.minus({[selectedView]:1}))}>
           <FontAwesomeIcon size='2x' icon={faCaretLeft} />
          </button>
          <h5>{dateInterval}</h5>
          <button className='arrow-button' onClick={() => setSelectedDate(prevDate => prevDate.plus({[selectedView]:1}))}>
            <FontAwesomeIcon size='2x' icon={faCaretRight} />
          </button>
        </div>

        <div className='event'>
          <button className='event-button' onClick={showAddModal}>Aggiungi Evento</button>
        </div>
      </div>

      <div className='calendar-view'>
        {selectedView === views.MONTH ? 
          <Month 
            events={events} 
            selectedDate={selectedDate} 
            weekDayNames={weekDayNames} 
            setDateInterval={setDateInterval}
            eventClickHandler={eventClickHandler}
          /> 
        : selectedView === views.WEEK ? 
          <Week 
            events={events} 
            selectedDate={selectedDate} 
            weekDayNames={weekDayNames} 
            setDateInterval={setDateInterval}
            eventClickHandler={eventClickHandler}
          /> 
        : selectedView === views.DAY ?
          <Day 
            events={events} 
            selectedDate={selectedDate} 
            weekDayNames={weekDayNames} 
            setDateInterval={setDateInterval}
            setEvents={setEvents}
          /> : null
        }
      </div>

      <AddModal addModalRef={addModalRef} setEvents={setEvents}/>

    </div>
  )
}

export default Calendar