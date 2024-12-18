import {useState} from "react"
import React from "react";
import {register} from "../services/user-manipulating";
import {Link} from "react-router-dom";

const Registration = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        register(user,setErrors, setMessage);
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
                <div className="bg-secondary" style={{minHeight: 600, minWidth: 400}}>
                    <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
                        <form onSubmit={handleSubmit}
                              className="d-flex flex-column justify-content-center align-items-center bg-white"
                              style={{minHeight: 600, minWidth: 400}}>
                            <div className="bg-danger mb-5 w-75 opacity-75 rounded">
                                {errors.length > 0 &&
                                    errors.map((err, index) => {
                                        return (
                                            <div className=" border border-danger border-3" key={index}>
                                                {err['email'] &&
                                                    <p className="fs-5 ms-3 mt-2 text-white">Email: {err['email']}</p>}
                                                {err['password'] &&
                                                    <p className="fs-5 mt-2 ms-3 text-white">Password: {err['password']}</p>}
                                                {!err.email && !err.password && <p>{JSON.stringify(err)}</p>}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bg-success mb-5 w-75 opacity-75 rounded">
                                {
                                    message.length > 0 &&
                                    <div className=" border border-susscess border-3">
                                        <p className="ms-2">{message}</p>
                                    </div>
                                }
                            </div>
                            <p className="fs-5 mb-3">Sign Up</p>
                            <div className="ms-3 me-3">
                                <input className="mb-4 form-control" style={{minWidth: 400}} type="text" name="email"
                                       onChange={handleChange} placeholder="Enter email"></input>
                            </div>
                            <div className="ms-3 me-3">
                                <input className="mb-4 form-control" style={{minWidth: 400}} type="password"
                                       name="password" onChange={handleChange} placeholder="Enter password"></input>
                            </div>
                            <input className="btn btn-primary mt-5" style={{minWidth: 300}} type="submit" name="sumbit"
                                   value="Register"></input>

                            <div className="mt-4">
                                Sign In <Link to="/login">link</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Registration;