import {useState, useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
const Login = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.
        post("http://localhost:3000/users/sign_in",
            {
                user
            },
            {
                withCredentials: true
            }
        )
            .then(res=> {
                    navigate("/")
                }
            ).catch(error => {
            setErrors([
                error.response.data.error
            ])
            console.log("Errors: ",error.response.data.error);
        })
    }

    const handleChange = (e) => {
        setUser(prevUser => ({
            ...prevUser ,
            [e.target.name]: e.target.value,
        }))

        console.log("User: ", user);
    }
    return (
        <>
            <div>
                {   errors &&
                    errors.map((err, index) => {
                        return(
                            <div key={index}>
                                <p>{err}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="email" onChange={handleChange} placeholder="Enter email"></input>
                    <input type="password" name="password" onChange={handleChange} placeholder="Enter password"></input>
                    <input type="submit" name="sumbit" value="Login"></input>
                </form>

                <div>{user.confirmation_token}</div>
            </div>
        </>
    )

}
export default Login