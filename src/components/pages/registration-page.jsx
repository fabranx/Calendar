import { useState } from "react"
import { registrationApi } from "../../api-client"
import './login-registration-page.css'


export default function RegistrationPage() {


  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const [error, setError] = useState(null) 
  const [isSuccess, setIsSuccess] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault()

    async function registration() {
      const data = {
        username: username,
        password1: password1,
        password2: password2
      }
      return await registrationApi(data)
    }

    let response = await registration()
    if(response.status === 204) {
      setError(null)
      setIsSuccess(true)
    }
    else {
      setError(Object.entries(response.data))
    }

  }
  
  return (
    <div className="login-registration-page">

    {
      isSuccess ? 
      
      <div>
        <h4>Registrazione correttamente avvenuta</h4>
        <h4>Effettua il login</h4>
      </div> 
      
      : 
      <form className="login-registration-form" method="post" onSubmit={handleSubmit}>
        <label className="input-label">
          Username 
          <input className="login-registration-input" type="text" required name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <label className="input-label">
          Password1 
          <input className="login-registration-input" type="password" required name="username" value={password1} onChange={(e) => setPassword1(e.target.value)}></input>
        </label>
        <label className="input-label">
          Password2 
          <input className="login-registration-input" type="password" required name="username" value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
        </label>
        {
        error ? <>
            {error.map((e, i) => <ul style={{color:"red"}} key={i}>
              {e[0]}
              {e[1].map((err,i) => <li key={i}>{err}</li>)}
            </ul>)}
          </> : null 
        }
        <button className="login-registration-button" type="submit">CONFERMA</button>
      </form>
    }
    </div>

  )

}