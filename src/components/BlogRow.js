const BlogRow = ({blog}) => {
    return (
        <div className="blog-row">
            <p>title: {blog.title}</p>
            <p>author: {blog.author}</p>
            <p>url: <a href={blog.url} target={"_blank"} rel="noreferrer"> {blog.url} </a></p>
            <p>likes: {blog.likes}</p>
            <p>created by: { blog.user ? blog.user.username : 'anonymous'}</p>
            <hr></hr>
        </div>
    )
}

export default BlogRow