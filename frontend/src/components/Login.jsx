import {useState, useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleSubmit = () => {
        axios.
        post("http://localhost:3000/users/sign_in", 
            {
                user
            }, 
            {
                withCredentials: true
            }
        ).then(resp => {
            console.log("Confirrmation token: ", user.confirmation_token)
        }).catch(error => {
            console.log(error);
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
                <form onSubmit={handleSubmit}> 
                    <input type="text" name="email" onChange={handleChange} placeholder="Enter email"></input>
                    <input type="text" name="password" onChange={handleChange} placeholder="Enter password"></input>
                    <input type="submit" name="sumbit" value="Login"></input>
                </form>

                <div>{user.confirmation_token}</div>
            </div>
        </>
    )

}
export default Login