import BlogRow from "./BlogRow"

const BlogList = ({blogs}) => {
    return (
        <div id="blog-list">
            {blogs.map(blog => {
                return (
                    <BlogRow blog={blog} key={blog.id}/>
                )
            })}
        </div>
    )
}

export default BlogList