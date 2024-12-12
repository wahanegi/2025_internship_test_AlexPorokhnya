import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
export function useCurrentUser(){
    const [user, setUser] = useState({});

    axios
        .get("http://localhost:3000/current_user",
            {
                withCredentials: true
            }
        ).then(resp => {
        setUser(resp.data)
    })

    return user;
}

export function usePostFetch() {
    const [errors, setErrors] = useState([])
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:3000/api/v1/posts")
            .then(resp => {
                setPosts(resp.data)
            })
            .catch(error => {
                setErrors([
                    ...errors,
                    error.data
                ])
            })
    }, [posts.length]);

    return [posts, errors];
}