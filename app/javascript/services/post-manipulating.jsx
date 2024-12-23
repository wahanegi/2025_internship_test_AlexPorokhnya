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
    return axios.patch(`/api/v1/posts/${id}`,
        {
            post
        },
        {
            withCredentials: true
        }).catch(error => {
            throw error;
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
    return axios.delete(`/api/v1/posts/${id}`,
        {
            withCredentials: true
        })
}