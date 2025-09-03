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
    console.log('Error')
  }
}
const signUp = async (formdata) => {
  try {
    const username = formdata.get('username')
    const password = formdata.get('password')
    const response = await api.post(
      '/auth/user',
      { username, password }
    );
    console.log(response.data.message);
    window.location.href = "/";
  } catch (error) {
    console.log('Error', error);
  }
};

function LoginApp() {
  return (
    <div id="login-app">
      <h1>MyBlog</h1>
      <div id="input-area">
    <div id="login-block">
      <form className="form" id="login-form" action={login}>
        <h1>Login</h1>
        <div id="login-inputs">
          <div className="input-field">
            <p>Username:</p>
            <input name="username"/>
          </div>
          <div className="input-field">
            <p>Password:</p>
            <input type="password" name="password"/>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div id="signup-block">
    <form className="form" id="signup-form" action={signUp}>
      <h1>Sign up</h1>
      <div id="signup-inputs">
        <div className="input-field">
          <p>Username:</p>
          <input name="username"/>
        </div>
        <div className="input-field">
          <p>Password:</p>
          <input type="password" name="password"/>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  </div>
  </div>
  )
}

export default LoginApp