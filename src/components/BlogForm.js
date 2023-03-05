import { useState } from "react"
const BlogForm = ( {submitBlog} ) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onTitleChange = (event) => {
        setTitle(
            event.target.value
        )
    }

    const onAuthorChange = (event) => {
        setAuthor(
            event.target.value
        )
    }

    const onUrlChange = (event) => {
        setUrl(
            event.target.value
        )
    }

    const handleBlogSubmit = (event) => {
        event.preventDefault()
        const newCollectedBlog = {
            title: title,
            author: author,
            url: url
        }
        submitBlog(newCollectedBlog)
        console.log("Blog submitted")
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <form onSubmit={handleBlogSubmit}>
            <label>
                title  
                <input type="text" id="titleInput" name="titleInput" value={title} onChange={onTitleChange}></input>    
            </label>
            <label> 
                author
                <input type='text' id="authorInput" name="authorInput" value={author} onChange={onAuthorChange}></input>    
            </label>
            <label> 
                url
                <input type="text" id="urlInput" name="urlInput" value={url} onChange={onUrlChange}></input>
            </label>
            <button type="submit">collect blog!</button>
        </form>
    )
}

export default BlogForm