import {useState, useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        axios.
        post("http://localhost:3000/users/", 
            {
                user
            }, 
            {
                withCredentials: true
            }
        ).catch(error => {
            setErrors([
                error.response.data.errors
            ])
            console.log("Errors: ",error.response.data.errors);
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
        <div style={{backgroundColor: "gray"}}>
            <div style={{backgroundColor: "white", minHeight: 600, minWidth: 400}}>
                <div>
                    {   errors &&
                        errors.map((err, index) => {
                            return(
                                <div key={index}>
                                    {err['email'] && <p>Email: {err['email']}</p>}
                                    {err['password'] && <p>Password: {err['password']}</p>}
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