import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import BaseModal from './BaseModal';
import { editEvent } from '../../eventsOperations';


function EditModal({editModalRef, setEvents, selectedDate, event, editEventIndex}) {

  const [formData, setFormData] = useState({
    date: selectedDate.toISODate(),
    event: event,
  })

  useEffect(() => {
    setFormData({
        event: event,
        date: selectedDate.toISODate()
      })
  }, [selectedDate, event])


  function handleSubmit(e) {
    e.preventDefault()

    const datetime = DateTime.fromISO(formData.date)

    if(datetime.isValid && formData.event) {
      setEvents((prev) => {
        let new_events = editEvent(prev, selectedDate, datetime, formData.event, editEventIndex)
        return new_events 
      })
      
      // setFormData({date: '', event: ''})
      editModalRef.current.close()
    }
  }

  function onEventChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        event: e.target.value
      }
    })
  }

  function onDateChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        date: e.target.value
      }
    })
  }

  return (
    <BaseModal
      modalRef={editModalRef}
      title={"Modifica Evento"}
      onDateChange={onDateChange}
      onEventChange={onEventChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  )
}

export default EditModal