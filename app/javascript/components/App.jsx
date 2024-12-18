import { Link } from 'react-router-dom';
import {usePostFetch} from '../hooks/data-fetch'
import React from "react";
import {Fragment} from "react";
import {useCurrentUser} from "../hooks/data-fetch";
import {logout} from "../services/user-manipulating";

function App() {

    const [posts, errors] = usePostFetch()
    const user = useCurrentUser();

    return (
        <>
            <div className="d-flex bg-secondary">
                <div className="d-flex flex-column ms-5" style={{minWidth: 300}}>
                    {Object.keys(user).length === 0 &&
                        <div className="d-flex flex-column">
                            <Link className="btn btn-info m-3" to="/register">Sign Up</Link>
                            <Link className="btn btn-info m-3" to="/login">Sign In</Link>
                        </div>
                    }
                    {
                        Object.keys(user).length > 0 &&
                        <div className="d-flex flex-column">
                            <p className="text-white align-self-center">{user.email}</p>
                            <Link className="btn btn-warning rounded-pill m-3" to="/newpost">Add new Post</Link>
                            <button className="btn btn-warning m-3 align-content-lg-end" onClick={logout}>LogOut</button>
                        </div>
                    }
                </div>
                <div className="d-flex flex-grow-1 flex-column align-items-center flex-column   ">
                {posts.length > 0 &&
                    <div className="mx-5 mt-3">
                    {
                        posts.map(post => {
                            return (
                                <div className="card bg-dark mb-3 text-white ps-3" style={{minWidth: 700}} key={post.id}>
                                    <p className="card-header">{post.created_at}</p>
                                    <p className="mt-3 card-title">From: {post.email}</p>
                                    <div className="card-body">
                                        <p>{post.title}</p>
                                        <p className="">{post.body}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>}
                </div>
            </div>
        </>
    )
}

export default App