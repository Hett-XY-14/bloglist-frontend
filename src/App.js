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

  // --- Login funcionality ---
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    const loggedUser = await loginService.login({
      username, password
    })
    console.log(loggedUser)
    setUser(loggedUser)
  }
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
  }

  // --- logout functionality ---
  const handleLogout = (event) => {
    event.preventDefault()
    console.log("Handle Logout called")
  }
  // --- return ---
  return (
    <div>
      <Header/>
      <Login username={username} password={password} onUsernameChange={onUsernameChange} onPasswordChange={onPasswordChange} handleLogin={handleLogin}/>
      <UserRow user={user} userPhoto={userPhoto} handleLogout={handleLogout}/>
      <Notification notification={notification}/>
      <h1>add new blog</h1>
      <BlogForm title={title} author={author} url={url} onTitleChange={onTitleChange} 
        onAuthorChange={onAuthorChange} onUrlChange={onUrlChange} handleBlogSubmit={handleBlogSubmit}
      />
      <BlogList blogs={blogs}/>
    </div>
  )
}

export default App;