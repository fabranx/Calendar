import './BaseModal.css'

function BaseModal({
  modalRef, 
  title,
  onDateChange,
  onEventChange,
  handleSubmit,
  formData,
  error
}) {
  
  return (
      <dialog ref={modalRef}>
        <h2 className='dialog-title'>{title}</h2>
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
          {error ? <p>{error}</p> : null}
          <div className='dialog-form-submit'>
            <button className='dialog-button cancelButton' onClick={() => modalRef.current.close()} formMethod="dialog">Cancella</button>
            <button className='dialog-button submitButton' type='submit'>Conferma</button>  
          </div>
        </form>
      </dialog>
  )
}

export default BaseModal