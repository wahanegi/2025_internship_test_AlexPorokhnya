import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import React from "react";
import {register} from "../services/user-manipulating";

const Registration = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        register(user,setErrors, navigate);
    }

    const handleChange = (e) => {
        setUser(prevUser => ({
            ...prevUser ,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <>
            <div style={{backgroundColor: "gray"}}>
                <div style={{backgroundColor: "white", minHeight: 600, minWidth: 400}}>
                    <div>
                        {   errors.length > 0 &&
                            errors.map((err, index) => {
                                return(
                                    <div key={index}>
                                        {err['email'] && <p>Email: {err['email']}</p>}
                                        {err['password'] && <p>Password: {err['password']}</p>}
                                        {!err.email && !err.password && <p>{JSON.stringify(err)}</p>}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className=" d-flex justify-content-center align-items-center vh-100">
                        <form onSubmit={handleSubmit} className="d-flex flex-column mt-4 ms-4">
                            <input className="mb-4 form-control" style={{minWidth: 300}} type="text" name="email" onChange={handleChange} placeholder="Enter email"></input>
                            <input className="mb-4 form-control" style={{minWidth: 300}} type="password" name="password" onChange={handleChange} placeholder="Enter password"></input>
                            <input className="btn btn-primary" type="submit" name="sumbit" value="Register"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Registration;