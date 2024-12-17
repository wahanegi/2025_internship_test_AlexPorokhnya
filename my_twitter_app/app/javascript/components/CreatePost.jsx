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
        postCreation(post,setErrors,navigate);
    }
    return (
        <>
            <div>
                {
                    errors.length > 0 && user &&
                    errors.map((err, index) => {
                        return(
                            <div key={index}>
                                {err['body'] && <p>Body: {err['body']}</p>}
                                {err['title'] && <p>Title: {err['title']}</p>}
                                {!err.body && !err.title && <p>{JSON.stringify(err)}</p>}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    Title: <input type="text" placeholder="title" onChange={handleChange} defaultValue="" name="title"></input>
                    Body: <input type="text" placeholder="body" onChange={handleChange} defaultValue="" name="body"></input>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        </>
    )
}

export default CreatePost