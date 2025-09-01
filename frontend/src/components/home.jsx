import api from '../api.js'
import { useEffect, useState } from "react"
import './home.css' 

function HomeApp() {
    const [posts, setPosts] = useState([])

    const hasToken = () => {
        const token = localStorage.getItem("token")
        if (!token) {
          console.log('No token')
          return false
        }
        return true
        }
        
    const fetchPosts = async () => {
        try {
            const allPosts = await (await api.get('/posts/all')).data
            setPosts(allPosts)
        } catch (err) {
            console.error("Failed to fetch posts", err)
        }
    }

    const createPost = async (formdata) => {
        if (formdata.get('content').length == 0) {
            console.log('Too short, handle this')
            return //I SHOULD INSTEAD HANDLE THIS INSIDE THE BACKEND
        }
        if (!hasToken()) {
            window.location.href = "/login"
            return
        }
        let token = localStorage.getItem('token')
        try {
          const response = await api.post('/posts', {content:formdata.get('content')}, {headers: {Authorization:`Bearer ${token}`}})
          await fetchPosts()
          } catch(error) {
          console.log("Could not post") //Error handle here if token is expired
        }
      }

      useEffect(() => {
        fetchPosts()
      }, []) 

    const putPosts = (post) => {
        return (
                <div key={post.id} id="post-container">
                    <div id="post-author">{post.user.username}</div>
                    <div id="post-content">{post.content}</div>
                </div>
              )}

    return (
    <div id="home-page">
      <div id="home-content">
        <div id="create-post-container">
            <form id="post-form" action={createPost}>
                <div id="post-inputs">
                    <div className="input-field-post">
                        <input id="post-content-input" name="content"/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div id="all-posts">
            {posts.map(putPosts)}
        </div>
      </div>
      </div>
    )
  }

  export default HomeApp
