import { useState, useEffect, useRef} from "react";
import blogService from './services/blogService';
import Header from "./components/Header";
import UserRow from "./components/UserRow";
import userPhoto from './assets/user-photo.jpg';
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Login from "./components/Login";
import loginService from "./services/loginService";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: '',
    type: null
  })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  },[])

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogCollectorUser'))
    if (storedUser) {
      setUser(storedUser)
      blogService.setToken(storedUser.token)
      showNotification(`Welcome back ${storedUser.username}`, 3, 2500)
    }
  },[])

  useEffect(() => {
    blogs.sort((a, b) => {return b.likes - a.likes})
  },[blogs])

  // --- Adding new blog functionality ---
  const handleBlogSubmit = (newCollectedBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newCollectedBlog)
      .then(collectedBlog => {
        setBlogs(blogs.concat(collectedBlog))
        console.log(collectedBlog)
        showNotification("Blog Collected!", 2, 3000)
      })
  }

  // --- Delete functionality ---
  const handleBlogDeletion = async (id) => {
    try {
      const deletedBlog = await blogService.deleteBlog(id)
      console.log(deletedBlog)
      setBlogs(
        blogs.filter(blog => blog.id !== id)
      )
    } catch (exception) {
      console.log(exception.message)
    }
  }

  // --- Like functionality ---
  const handleLike = async (id,likedBlog) => {
    try {
      const updatedBlog = await blogService.update(id, likedBlog)
      console.log(updatedBlog)
      setBlogs(
        blogs.map((blog) => {
          return blog.id === updatedBlog.id ? {...blog, likes:updatedBlog.likes} : blog
        })
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  // --- Login funcionality ---
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const loggedUser = await loginService.login({
        username, password
      })
      console.log(loggedUser)
      console.log(loggedUser.expiresIn)
      window.localStorage.setItem('loggedBlogCollectorUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      showNotification(`Welcome back ${loggedUser.username}`, 3, 2500)
    
    } catch (exception) {
      console.log(exception)
      showNotification("Wrong username or password", 2, 5000)
    }
  }

  // --- logout functionality ---
  const handleLogout = (event) => {
    event.preventDefault()
    console.log("Handle Logout called")
    window.localStorage.removeItem('loggedBlogCollectorUser')
    setUser(null)
    setPassword("")
    setUsername("")
  }

  // --- Auxiliary methods ---
  const showNotification = (message, type, timeout) => {
    setNotification({
      message,
      type
    })
    setTimeout(() => {
      setNotification('')
    }, timeout)
  }
  
  // --- return ---
  return (
    <div>
      <Header/>
      {!user && 
        <>
          <Login username={username} password={password} onUsernameChange={onUsernameChange} onPasswordChange={onPasswordChange} handleLogin={handleLogin}/>
          <Notification message={notification.message} type={notification.type}/>
        </>
      }
      { user && 
        <>
          <UserRow user={user} userPhoto={userPhoto} handleLogout={handleLogout}/>
          <Notification message={notification.message} type={notification.type}/>
          
          <Togglable labelTitle={'collect blog'} closeLabelTitle={'maybe later'} ref={blogFormRef}>
            <h1>collect new blog</h1>
            <BlogForm submitBlog={handleBlogSubmit}
            />
          </Togglable>
          <h1>your blog collection:</h1>
          <BlogList blogs={blogs} user={user} handleLike={handleLike} handleBlogDeletion={handleBlogDeletion}/>
        </>
      }
      
    </div>
  )
}

export default App;