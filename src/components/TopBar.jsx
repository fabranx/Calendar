import './TopBar.css'

function TopBar() {
  return (
    <div className='top-bar'>
      <h3 className='title'>
        <a href='https://github.com/fabranx/calendar'>
          Calendar
        </a>
      </h3>

      <button className='login-button' onClick={() => alert('non ancora implementato')}>Login</button>
    </div>
  )
}

export default TopBar