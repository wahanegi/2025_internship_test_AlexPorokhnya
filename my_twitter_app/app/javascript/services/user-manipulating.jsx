import axios from "axios";

export function login(user, setErrors, navigate){
    axios.
    post("http://localhost:3000/users/sign_in",
        {
            user
        },
        {
            withCredentials: true
        }
    )
        .then(res=> {
                navigate("/")
            }
        ).catch(error => {
        setErrors([
            error.response.data.error
        ])
    })
}

export function register(user, setErrors, navigate){
    axios.
    post("http://localhost:3000/users/",
        {
            user
        },
        {
            withCredentials: true
        }
    ).then(res => {
        navigate("/")
    }).catch(error => {
            setErrors([
                error.response.data.errors
            ])
        })
}