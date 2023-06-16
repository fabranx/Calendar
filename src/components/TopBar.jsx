import './TopBar.css'
import { client, logoutApi } from '../api-client'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from '../context'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function TopBar() {

  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

  const navigate = useNavigate()

  function logout() {
    logoutApi()
    .then(res => {
      setIsLoggedIn(false)
    })
    .catch(err => setIsLoggedIn(false))
  }

  return (
    <div className='top-bar'>
      <h3 className='title'>
        <a href='https://github.com/fabranx/calendar'>
          Calendar
        </a>
      </h3>

    {
      isLoggedIn ? (
        <div className='signed-in-div'>
          <p>{client.username}</p>
          <button className='logout-button' onClick={logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </div>
        ) :
      <button onClick={() => navigate('/login')} className='login-button'>Login</button>
    }
    </div>
  )
}

export default TopBar