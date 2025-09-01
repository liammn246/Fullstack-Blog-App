import api from '../api.js'
import './login.css'

const login = async (formdata) => {
  try {
    const username = formdata.get('username')
    const password = formdata.get('password')
    const response = await api.post('/auth/login', new URLSearchParams({username, password}),{headers: {'Content-Type':'application/x-www-form-urlencoded'}})
    const token = response.data.access_token
    localStorage.setItem('token', token)
    window.location.href = "/"
  } catch(error) {
    console.log('Error bruh')
  }
}

function LoginApp() {
  return (
    <div id="login-block">
      <form id="login-form" action={login}>
        <div id="login-inputs">
          <div className="input-field">
            <p>Username:</p>
            <input name="username"/>
          </div>
          <div className="input-field">
            <p>Password:</p>
            <input name="password"/>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginApp