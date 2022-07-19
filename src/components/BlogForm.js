const BlogForm = ({title, author, url, onTitleChange, onAuthorChange, onUrlChange, handleBlogSubmit}) => {
    return (
        <form onSubmit={handleBlogSubmit}>
            <label>title </label>
            <input type="text" name="titleInput" value={title} onChange={onTitleChange}></input>
            <label>author </label>
            <input type="text" name="authorInput" value={author} onChange={onAuthorChange}></input>
            <label>url </label>
            <input type="text" name="urlInput" value={url} onChange={onUrlChange}></input>
            <button type="submit">collect blog!</button>
        </form>
    )
}

export default BlogForm