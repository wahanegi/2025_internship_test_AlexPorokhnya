import { Link } from 'react-router-dom';
import {usePostFetch} from '../hooks/data-fetch'
import React from "react";
import {Fragment} from "react";

function App() {

    const [posts, errors] = usePostFetch()

    return (
        <>
            <div>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/newpost">Add new Post</Link>
                <a>Hello</a>
            </div>
            {posts.length > 0 &&
                <div>
                {
                    posts.map(post => {
                        return (
                            <div key={post.id}>
                                <p>{post.created_at}</p>
                                {<p>{post.email}</p>}
                                <p>{post.title}</p>
                                <p>{post.body}</p>
                            </div>
                        )
                    })
                }
            </div>}
        </>
    )
}

export default App
