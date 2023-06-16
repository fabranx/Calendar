import { useState, useContext } from "react"
import { loginApi } from "../../api-client"
import { LoginContext } from "../../context"
import { useNavigate } from "react-router-dom"
import './login-registration-page.css'


export default function LoginPage() {

  const {setIsLoggedIn} = useContext(LoginContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null) 

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    async function login() {
      const data = {
        username: username,
        password: password,
      }
      return await loginApi(data)
    }

    let response = await login()
    
    if(response.status === 200) {
      setIsLoggedIn(true)
      navigate('/')
    }
    else {
      setError([...response.data.non_field_errors])
    }

  }
  
  return (
    <div className="login-registration-page">
      <form className="login-registration-form" method="post" onSubmit={handleSubmit}>
        <label className="input-label">
          Username 
          <input className="login-registration-input" type="text" required name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </label>
        <label className="input-label">
          Password 
          <input className="login-registration-input" type="password" required name="username" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </label>
        {
        error ? <>
            {error.map((e, i) => <h5 style={{color:"red"}} key={i}>{e}</h5>)}
          </> : null 
        }
        <button className="login-registration-button" type="submit">CONFERMA</button>
      </form>

      <h4 className="login-registration-link" onClick={() => navigate('/registrazione')}>Clicca qui per registrarti</h4>

    </div>

  )

}