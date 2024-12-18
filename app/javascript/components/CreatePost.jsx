import { useState } from "react"
import {postCreation} from "../services/post-manipulating";
import { useNavigate } from "react-router-dom";
import {useCurrentUser} from '../hooks/data-fetch'
import React from "react";

const CreatePost =() => {
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
        postCreation(post,setErrors,navigate);
    }
    return (
        <>
            <div className="bg-danger mb-5 w-100 opacity-75 rounded">
                {
                    errors.length > 0 && user &&
                    errors.map((err, index) => {
                        return(
                            <div className="border border-danger border-3" key={index}>
                                {!err.body && !err.title && <p>{JSON.stringify(err)}</p>}
                                {err['body'] && <p className="fs-5 ms-3 mt-2 text-white">Body: {err['body']}</p>}
                                {err['title'] && <p className="fs-5 ms-3 mt-2 text-white">Title: {err['title']}</p>}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
                    <p className ="mb-2">Title </p><input className="form-control mb-4" style={{maxWidth: 500}} type="text" placeholder="Title" onChange={handleChange} defaultValue="" name="title"></input>
                    <p className="mb-2">Body</p> <input className="form-control mb-4" style={{maxWidth: 500}} type="text" placeholder="Body" onChange={handleChange} defaultValue="" name="body"></input>
                    <input className="btn btn-primary" style={{minWidth: 500}} type="submit" value="Save"></input>
                </form>
            </div>
        </>
    )
}

export default CreatePost