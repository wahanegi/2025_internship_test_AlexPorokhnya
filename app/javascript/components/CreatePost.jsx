import { useState } from "react"
import {postCreation} from "../services/post-manipulating";
import { useNavigate } from "react-router-dom"
import {useCurrentUser} from '../hooks/data-fetch'
import React from "react";

const CreatePost = () => {
    const [post, setPost] = useState({});
    const [errors, setErrors] = useState([]);
    const user = useCurrentUser();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost(prev => ({
            ...prev ,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if(post.body == null && post.title == null ){
            setErrors(['Your post is blank']);
        } else {
            postCreation(post, setErrors, navigate);
        }
    }
    return (
        <>
            <div className="bg-dark vh-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-white align-self-center">Create a new post</h2>
                <div className="bg-danger mb-4 bg-opacity-75 rounded text-white border border-danger border-2" >
                    {
                        errors.length > 0 && user &&
                        errors.map((err, index) => {
                            return (
                                <div className="m-3" style={{maxWidth: 600}} key={index}>
                                    {!err.body && !err.title && <p>{JSON.stringify(err)}</p>}
                                    {err['body'] &&
                                        <p className="m-3">Body: {err['body']}</p>}
                                    {err['title'] &&
                                        <p className="m-3">Title: {err['title']}</p>}
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <form className="d-flex flex-column justify-content-center align-items-center text-white"
                          onSubmit={handleSubmit}>
                        <p className="mb-2">Title* </p><input className="form-control mb-4" style={{maxWidth: 500}}
                                                             type="text" placeholder="Title" onChange={handleChange}
                                                             defaultValue="" name="title"></input>
                        <p className="mb-2">Body* </p> <input className="form-control mb-4" style={{maxWidth: 500}}
                                                            type="text" placeholder="Body" onChange={handleChange}
                                                            defaultValue="" name="body"></input>
                        <input className="btn btn-success" style={{minWidth: 500}} type="submit" value="Save"></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePost