import api from '../api.js'

function LoginApp() {
  return (
    <div>
      {/* Form goes here , pass information into login function for token, 
      then attempt to load home page (will succeed if have token) */}
    </div>
  )
}

export default LoginApp

const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', new URLSearchParams({username, password}),{headers: {'Content-Type':'application/x-www-form-urlencoded'}})
    const token = response.data.access_token
    localStorage.setItem('token', token)
    return token
  } catch(error) {
    console.log('Error bruh')
  }
}

const createPost = async (post_content) => {
  token = localStorage.getItem('token')
  try {
    const response = await api.post('/posts', {content:post_content}, {headers: {Authorization:`Bearer ${token}`}})
    return response.data
    } catch(error) {
    console.log("Could not post")
  }
}
