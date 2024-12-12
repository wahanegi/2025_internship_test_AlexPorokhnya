import axios from "axios";

export function postCreation(post, setErrors, navigate) {
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
    })
}