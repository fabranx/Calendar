import { useState } from 'react';
import { DateTime } from 'luxon';
import BaseModal from './BaseModal';
import { addEvent } from '../../eventsOperations';

function AddModal({addModalRef, setEvents}) {

  const [formData, setFormData] = useState({
    date: '',
    event: '',
  })


  function handleSubmit(e) {
    e.preventDefault()

    const datetime = DateTime.fromISO(formData.date)

    if(datetime.isValid && formData.event) {

      setEvents((prev) => {
        let new_events = addEvent(prev, datetime, formData.event)
        return new_events
      })
      
      setFormData({date: '', event: ''})
      addModalRef.current.close()
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
      modalRef={addModalRef}
      title={"Aggiungi Evento"}
      onDateChange={onDateChange}
      onEventChange={onEventChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  )
}

export default AddModal