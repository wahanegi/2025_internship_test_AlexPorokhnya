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
            <div>
                <form onSubmit={handleSubmit}> 
                    <input type="text" name="email" onChange={handleChange} placeholder="Enter email"></input>
                    <input type="password" name="password" onChange={handleChange} placeholder="Enter password"></input>
                    <input type="submit" name="sumbit" value="Register"></input>
                </form>
            </div>
        </>
    )

}

export default Registration;