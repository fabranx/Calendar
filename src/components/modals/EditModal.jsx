import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../../context';
import { DateTime } from 'luxon';
import BaseModal from './BaseModal';
import { editEvent } from '../../eventsOperations';
import { client } from '../../api-client';


function EditModal({editModalRef, setEvents, selectedDate, event, editEventIndex, editEventMutation}) {

  const {isLoggedIn} = useContext(LoginContext)

  const [formData, setFormData] = useState({
    date: selectedDate.toISODate(),
    event: event.description,
  })

  useEffect(() => {
    setFormData({
        event: event.description,
        date: selectedDate.toISODate()
      })
  }, [selectedDate, event])


  function handleSubmit(e) {
    e.preventDefault()

    const datetime = DateTime.fromISO(formData.date)

    if(datetime.isValid && formData.event && formData.event.trim()) {

      if(isLoggedIn) {
        editEventMutation.mutate({
          token: client.token,
          username: client.username,
          id: event.id,
          data: {
            author: client.pk,
            date: datetime.toISODate(),
            description: formData.event,
          }
        })
      }
      else {
        setEvents((prev) => {
          let new_events = editEvent(prev, selectedDate, datetime, formData.event, editEventIndex)
          return new_events 
        })   
      }

      if(!editEventMutation.isLoading && !editEventMutation.isError) {
        editModalRef.current.close()
      }
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
      error={editEventMutation.isError ? editEventMutation.error.message : null}
    />
  )
}

export default EditModal