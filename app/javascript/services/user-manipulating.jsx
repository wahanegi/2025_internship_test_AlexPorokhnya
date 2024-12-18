import axios from "axios";

export function login(user, setErrors, navigate){
    axios.
    post("/users/sign_in",
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
export function logout(){
    axios.
    delete("/users/sign_out",
        {withCredentials: true}
    ).then(res=> {
        window.location.reload()
    })
}
export function register(user, setErrors, setMessage){
    axios.
    post("/users/",
        {
            user
        },
        {
            withCredentials: true
        }
    ).then(res => {
        setMessage("Please confirm your email and sign in")
    }).catch(error => {
            setErrors([
                error.response.data.errors
            ])
        })
}