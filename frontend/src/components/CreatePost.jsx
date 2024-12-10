import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost =() => {
    const [post, setPost] = useState({});
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get("http://localhost:3000/current_user", 
            {
                withCredentials: true
            }
        ).then(resp => {
            setUser(resp.data)
            console.log("User: ", resp.data)
        }).catch(errors => {
            errors
        })
    }, [])
    const handleChange = (e) => {
        setPost(prev => ({
            ...prev ,
            [e.target.name]: e.target.value,
        }))
        console.log(post)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:3000/api/v1/posts", 
        {
            post:post
        }, 
        {
            withCredentials: true
        })
        .then((res) => {
            navigate("/")
        })
        .catch(error => {
            setErrors(
                [
                    error.response.data.data
                ]
            )
            console.log("Errors: ", error.response.data.data)
        })
    }
    return (
        <>
            <div>
                {
                    errors && 
                    errors.map((err, index) => {
                        return(
                            <div key={index}>
                                {err['body'] && <p>Body: {err['body']}</p>}
                                {err['title'] && <p>Title: {err['title']}</p>}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    Title: <input type="text" placeholder="title" onChange={handleChange} defaultValue="" name="title"></input>
                    Body: <input type="text" placeholder="body" onChange={handleChange} defaultValue="" name="body"></input>
                    <input type="submit" value="Save"></input>
                </form>
            </div>
        </>
    )
}

export default CreatePost