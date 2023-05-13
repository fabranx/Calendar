import './Modal.css'
import { useState } from 'react';
import { DateTime } from 'luxon';

function Modal({dialogRef, setEvents}) {

  const [formData, setFormData] = useState({
    date: '',
    event: '',
  })


  function handleSubmit(e) {
    e.preventDefault()

    const datetime = DateTime.fromISO(formData.date)

    if(datetime.isValid && formData.event) {
      const date = {
        year: datetime.year.toString(),
        month: datetime.month.toString(),
        day: datetime.day.toString()
      }

      setEvents((prev) => {
        return {
          ...prev,
          [date.year]: {
            ...prev[date.year],
            [date.month] : {
              ...prev[date.year]?.[date.month],
              [date.day]:  prev[date.year]?.[date.month]?.[date.day] ?
                 [...prev[date.year]?.[date.month]?.[date.day], formData.event] : 
                 [formData.event]
            }
          }
        }
      })
      
      setFormData({date: '', event: ''})
      dialogRef.current.close()
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
      <dialog ref={dialogRef}>
        <h2 className='dialog-title'>Aggiungi Evento</h2>
        <form onSubmit={handleSubmit}>
          <label className='dialog-form-label'>
            <p>Data</p>
            <input 
              className='dialog-form-date'
              type='date'
              onChange={onDateChange}
              value={formData.date}
            />
          </label>
          <label className='dialog-form-label'>
            <p>Descrizione</p> 
            <textarea className='dialog-form-textarea' onChange={onEventChange} value={formData.event}></textarea>
          </label>
          <div className='dialog-form-submit'>
            <button className='dialog-button cancelButton' onClick={() => dialogRef.current.close()} formMethod="dialog">Cancella</button>
            <button className='dialog-button submitButton' type='submit'>Conferma</button>  
          </div>
        </form>
      </dialog>
  )
}

export default Modal