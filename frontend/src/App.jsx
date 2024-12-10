import {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';


function App() {

  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/api/v1/posts")
    .then(resp => {
      setPosts(resp.data)
      console.log("Resp data: ", resp.data)
    })
    .catch(error => {
      setErrors(
        ...errors, 
        error.data
      )
    })
  }, [posts.length])  

  return (
    <>
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
     <div>
        {
          posts.map(post => {
            return(
              <div key={post.id}>
                <p>{post.created_at}</p>
                <p>{post.title}</p>  
                <p>{post.body}</p>
              </div>
            )
          })
        }
     </div>
    </>
  )
}

export default App
