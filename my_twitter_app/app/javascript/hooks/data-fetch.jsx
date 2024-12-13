import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
export function useCurrentUser(){
    const [user, setUser] = useState({});

    axios
        .get("/current_user",
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
            .get("/api/v1/posts")
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