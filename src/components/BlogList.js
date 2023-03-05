import BlogRow from "./BlogRow"

const BlogList = ({blogs, user, handleLike, handleBlogDeletion}) => {
    return (
        <div id="blog-list">
            {blogs.map(blog => {
                return (
                    <BlogRow blog={blog} loggedUser={user} key={blog.id} handleLike={handleLike} handleBlogDeletion={handleBlogDeletion}/>
                )
            })}
        </div>
    )
}

export default BlogList