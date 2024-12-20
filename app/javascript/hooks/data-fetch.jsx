import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
export function useCurrentUser(){
    const [user, setUser] = useState({});
    useEffect(() => {
        axios
            .get("/current_user",
                {
                    withCredentials: true
                }
            ).then(resp => {
            setUser(resp.data)
        })
    }, []);
    return user;
}