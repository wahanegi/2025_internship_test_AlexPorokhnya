import axios from "axios";
import {useEffect, useState} from "react";

export function postCreation(post, setErrors, navigate) {
    axios
    .post("/api/v1/posts",
        {
            post
        },
        {
            withCredentials: true
        })
    .then((res) => {
        navigate("/")
    })
    .catch(error => {
        setErrors(
            [
                error.response.data.data
            ]
        )
    })
}

export function postUpdate(post, id) {
    axios.
        patch(`/api/v1/posts/${id}`,
        {
            post
        },
        {
            withCredentials: true
        }).then(res => {
        })
}
export function postFetch(setPosts) {
    axios
        .get("/api/v1/posts")
        .then(resp => {
            setPosts(resp.data)
        })
}
export function postDelete(id) {
    axios.delete(`/api/v1/posts/${id}`,
        {
            withCredentials: true
        }).then(res => {
        })
}