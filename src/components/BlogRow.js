import { useState, useEffect } from "react";

const BlogRow = ({blog, loggedUser, handleLike, handleBlogDeletion}) => {

    const [ detailsVisibility, setDetailsVisibility ] = useState(false)
    const [ deletionEnabled, setDeletionEnabled ] = useState()

    const shownWhenVisibilityTrue = {display: detailsVisibility ? '' : 'none'}
    const hiddenWhenVisibilityTrue = {display: detailsVisibility ? 'none' : ''} 
    const deleteButtonVisibility = {display: deletionEnabled ? '' : 'none'}

    useEffect(() => {
        setDeletionEnabled(
            loggedUser.id === blog.user.id
        )
    },[loggedUser, blog])

    const toggleVisibility = () => {
        setDetailsVisibility(!detailsVisibility)
    }

    const handleBlogLike = () => {
        const likedBlog = {
            author : blog.author,
            title : blog.title,
            url : blog.url,
            likes : blog.likes + 1,
            user: blog.user.id
        }
        console.log(likedBlog)
        handleLike(blog.id, likedBlog)
    }

    const deleteBlog = () => {
        if(window.confirm('Are you sure you want to delete this blog?')) {
            handleBlogDeletion(blog.id)
        }
    }

    const blogRowStyle = {
        paddingTop:10,
        paddingBottom: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 10
    }

    return (
        <div className="blog-row" style={blogRowStyle}>
            <p>title: {blog.title}</p>
            <button style={hiddenWhenVisibilityTrue} onClick={toggleVisibility}>show details</button>
            <div style={shownWhenVisibilityTrue}>
                <p>author: {blog.author}</p>
                <p>url: <a href={blog.url} target={"_blank"} rel="noreferrer"> {blog.url} </a></p>
                <p>likes: {blog.likes}
                    <button onClick={handleBlogLike}>Like</button>
                </p>
                <p>created by: { blog.user ? blog.user.username : 'anonymous'}</p>
                <button onClick={deleteBlog} style={deleteButtonVisibility}>Delete</button>
                <button onClick={toggleVisibility}>show less</button>
            </div>
           
        </div>
    )
}

export default BlogRow