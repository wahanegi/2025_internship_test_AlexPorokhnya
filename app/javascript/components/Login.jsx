import {useState} from "react"
import { useNavigate } from "react-router-dom";
import {login} from "../services/user-manipulating";
import React from "react";
import {Link} from "react-router-dom";
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
                <div className="bg-dark" style={{minHeight: 600, minWidth: 400}}>
                    <div className=" d-flex flex-column justify-content-center align-items-center vh-100">
                        <form onSubmit={handleSubmit}
                              className="d-flex flex-column justify-content-center align-items-center bg-white"
                              style={{minHeight: 600, minWidth: 400}}>
                            <div className="bg-danger mb-5 w-75 bg-opacity-75 rounded text-white">
                                {errors.length > 0 &&
                                    errors.map((err, index) => {
                                        return (
                                            <div className="m-3" key={index}>
                                                {err['email'] &&
                                                    <p className="m-3">Email: {err['email']}</p>}
                                                {err['password'] &&
                                                    <p className="m-3">Password: {err['password']}</p>}
                                                {!err.email && !err.password && <p>{JSON.stringify(err)}</p>}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p className="fs-5 mb-3">Sign In</p>
                            <div className="ms-3 me-3">
                                <input className="mb-4 form-control" style={{minWidth: 400}} type="text" name="email"
                                       onChange={handleChange} placeholder="Enter email"></input>
                            </div>
                            <div className="ms-3 me-3">
                                <input className="mb-4 form-control" style={{minWidth: 400}} type="password"
                                       name="password" onChange={handleChange} placeholder="Enter password"></input>
                            </div>
                            <input className="btn btn-primary mt-5" style={{minWidth: 300}} type="submit" name="sumbit"
                                   value="Log In"></input>

                            <div className="mt-4">Sign Up <Link to="/register">link</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Login