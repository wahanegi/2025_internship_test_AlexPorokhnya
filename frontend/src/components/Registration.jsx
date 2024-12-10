import {useState, useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const [user, setUser] = useState({});

    const navigate = useNavigate();

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
        ).then(resp => {
            axios.get("http://localhost:3000/users/confirmation").
            then(resp => {
                // navigate(`http://localhost:3000/users/confirmation?confirmation_token=${resp.data}`)
                <Link to="https://www.google.com/search?client=opera&q=google&sourceid=opera&ie=UTF-8&oe=UTF-8" />
            })
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
                    <input type="submit" name="sumbit" value="Register"></input>
                </form>
            </div>
        </>
    )

}

export default Registration;