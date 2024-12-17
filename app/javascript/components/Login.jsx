import {useState} from "react"
import { useNavigate } from "react-router-dom";
import {login} from "../services/user-manipulating";
import React from "react";
const Login = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(user,setErrors, navigate);
    }

    const handleChange = (e) => {
        setUser(prevUser => ({
            ...prevUser ,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <>
            <div>
                {   errors.length > 0
                    &&
                    errors.map((err, index) => {
                        return(
                            <div key={index}>
                                {!err.email && !err.password && <p>{JSON.stringify(err)}</p>}
                                {err['email'] && <p>Email: {err['email']}</p>}
                                {err['password'] && <p>Password: {err['password']}</p>}
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
            </div>
        </>
    )

}
export default Login