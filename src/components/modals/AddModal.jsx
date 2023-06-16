import { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import BaseModal from './BaseModal';
import { addEvent } from '../../eventsOperations';
import { LoginContext } from '../../context';
import { client } from '../../api-client';

function AddModal({addModalRef, setEvents, addEventMutation}) {

  const {isLoggedIn} = useContext(LoginContext)

  const [formData, setFormData] = useState({
    date: '',
    event: '',
  })


  function handleSubmit(e) {
    e.preventDefault()

    const datetime = DateTime.fromISO(formData.date)

    if(datetime.isValid && formData.event && formData.event.trim()) {

      if(isLoggedIn) {
        addEventMutation.mutate({ 
          token: client.token, 
          data: {
            author: client.pk,
            date: datetime.toISODate(),
            description: formData.event
          }
        })
      }
      else {
        setEvents((prev) => {
          let new_events = addEvent(prev, datetime, formData.event)
          return new_events
        })
      }
      
      if(!addEventMutation.isLoading && !addEventMutation.isError) {
        setFormData({date: '', event: ''})
        addModalRef.current.close()
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
      modalRef={addModalRef}
      title={"Aggiungi Evento"}
      onDateChange={onDateChange}
      onEventChange={onEventChange}
      handleSubmit={handleSubmit}
      formData={formData}
      error={addEventMutation.isError ? addEventMutation.error.message : null}
    />
  )
}

export default AddModal