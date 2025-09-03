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
        if (!hasToken()) {
            window.location.href = "/login"
            return
        }
        let token = localStorage.getItem('token')
        try {
          const response = await api.post('/posts', {content:formdata.get('content')}, {headers: {Authorization:`Bearer ${token}`}})
          if (response.status == 200) {
            await fetchPosts()
          }
          } catch(error) {
            if (error.response.status == 401) {
                window.location.href = "/login"
            }
          console.log("Could not post")
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
                        <textarea id="post-content-input" name="content"/>
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
