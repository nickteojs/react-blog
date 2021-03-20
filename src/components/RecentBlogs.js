import React, {useContext} from 'react'
import Loader from './Loader'
import { BlogContext } from '../context/BlogContext'


const RecentBlogs = () => {
    const [blogs, loading] = useContext(BlogContext);

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <div><h1 className="text-center">Recent Blogs</h1></div>
            {blogs.map(blog => (
                <div className="blog-preview">
                    <h1>{blog.name}</h1>
                    <p>By: {blog.author}</p>
                </div>
            ))}
        </div>
    )
}

export default RecentBlogs
