import { Link } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {Fragment} from "react";
import {useCurrentUser} from "../hooks/data-fetch";
import {logout} from "../services/user-manipulating";
import {postUpdate, postDelete,postFetch} from "../services/post-manipulating";
import { FaPen } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import moment from "moment";

//TODO: replace field with user email into a button for creating profile with all posts only for specific user
function App() {

    const [posts, setPosts] = useState([]);
    const [editedPost, setEditedPost] = useState({});
    const [postId, setPostId] = useState(null);
    const [errors, setErrors] = useState([]);
    const user = useCurrentUser();
    useEffect(() => {
        postFetch(setPosts);
    }, []);
    const handleUpdate = (id) => {
        setPostId(id)
    }

    const handleSave = (id) => {
        if(Object.keys(editedPost).length > 0) {
            postUpdate(editedPost, id).
            then(resp => {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === id ? {...post, ...editedPost} : post
                    )
                );
                setPostId(null);
                setEditedPost({});
                setErrors([]);
            }).catch(error => {
                setErrors([
                    error.response.data.data,
                ])
            })
        }else{
            setPostId(null);
        }
    }

    const handleDelete = (id) => {
        const result = window.confirm("Are you sure you want to delete this tweet?");
        if(result){
            postDelete(id).
                then(() =>
                    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)));
        }
    }
    const handleChange = (e) => {
        setEditedPost(prev => ({
            ...prev ,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <div className="d-flex bg-dark vh-100">
                <div className="d-flex flex-column border-2 border-end" style={{minWidth: 300}}>
                    {Object.keys(user).length === 0 &&
                        <div className="d-flex flex-column me-3">
                            <Link className="btn btn-success m-3" to="/register"><FaHouseChimneyMedical /> Sign Up</Link>
                            <Link className="btn btn-info m-3" to="/login"><FaHouseChimneyUser /> Sign In</Link>
                        </div>
                    }
                    {
                        Object.keys(user).length > 0 &&
                        <div className="d-flex flex-column me-3">
                            <p className="text-white align-self-center mt-3">
                                {user.email}
                            </p>
                            <Link className="d-flex justify-content-center align-items-center btn btn-warning rounded-pill m-3" to="/newpost"><FaPlus /> Add new Post</Link>
                            <button className="btn btn-secondary m-3 align-content-lg-end" onClick={logout}><FaArrowRightToBracket /> LogOut</button>
                        </div>
                    }
                </div>
                <div className="d-flex flex-grow-1 flex-column align-items-center flex-column">
                    {posts.length === 0 &&
                        <div className="mt-3 d-flex flex-column justify-content-center align-self-center fs-5 text-white vh-100">
                            It's so dark and empty here. Will you take the first step? Add new tweet!
                        </div>
                    }
                    {posts.length > 0 &&
                        <div className="mx-5 mt-3">
                        {
                            posts.map(post => {
                                return (
                                    <div className="card bg-secondary mb-3 text-white ps-3" style={{minWidth: 700}}
                                         key={post.id}>
                                        <p className="card-header">From: {post.email} {moment(post.created_at).fromNow()}</p>
                                        {
                                            (errors.length > 0 && postId === post.id) &&
                                            errors.map((err, index) => {
                                                return(
                                                    <div className="border border-danger border-3 me-2" key={index}>
                                                        {!err.body && !err.title && <p>{JSON.stringify(err)}</p>}
                                                        {err['body'] && <p className="m-2 text-white">Body: {err['body']}</p>}
                                                        {err['title'] && <p className="m-2 text-white">Title: {err['title']}</p>}
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="card-body">
                                            {postId !== post.id ? <h4>{post.title}</h4> : <input onChange={handleChange} name="title" className="form-control" defaultValue={post.title}></input>}
                                            {postId !== post.id ? <p>{post.body}</p> : <input onChange={handleChange} name="body" className="form-control" defaultValue={post.body}></input>}
                                        </div>

                                        {Object.keys(user).length > 0 && post.email === user.email &&
                                            <div className="d-flex justify-content-between align-items-center">
                                                {
                                                    postId === post.id ?
                                                    <button className="btn btn-success mb-2 d-flex align-items-center justify-content-center"
                                                            onClick={() => handleSave(post.id)}><FaSave /> Save</button> :
                                                    <button onClick={() => handleUpdate(post.id)}
                                                            className="btn btn-warning mb-2"><FaPen /> Edit</button>
                                                }
                                                <button onClick={() => handleDelete(post.id)} className="btn btn-danger m-2">Delete <FaDeleteLeft /></button>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                </div>
            </div>
        </>
    )
}

export default App