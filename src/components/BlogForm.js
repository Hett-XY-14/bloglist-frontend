const BlogForm = ({title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleBlogSubmit}) => {
    return (
        <form onSubmit={handleBlogSubmit}>
            <label>
                title  
                <input type="text" id="titleInput" name="titleInput" value={title} onChange={onTitleChange}></input>    
            </label>
            <label> 
                author
                <input type="text" id="authorInput" name="authorInput" value={author} onChange={onAuthorChange}></input>    
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