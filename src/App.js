import { useState, useEffect} from "react";
import blogService from './services/blogService';
import Header from "./components/Header";
import UserRow from "./components/UserRow";
import userPhoto from './assets/user-photo.jpg';
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Login from "./components/Login";
import loginService from "./services/loginService";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    type: null
  })

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

  // --- Adding new blog functionality ---
  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const onAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const onUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleBlogSubmit = (event) => {
    event.preventDefault()
    console.log("Blog submitted")
    const newCollectedBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(newCollectedBlog)
      .then(collectedBlog => {
        setBlogs(blogs.concat(collectedBlog))
        setTitle("")
        setAuthor("")
        setUrl("")
        console.log(collectedBlog)
        showNotification("Blog Collected!", 2, 3000)
      })
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
          <h1>add new blog</h1>
          <BlogForm title={title} author={author} url={url} onTitleChange={onTitleChange} 
            onAuthorChange={onAuthorChange} onUrlChange={onUrlChange} handleBlogSubmit={handleBlogSubmit}
          />
          <h1>your blog collection:</h1>
          <BlogList blogs={blogs}/>
        </>
      }
      
    </div>
  )
}

export default App;