import './App.css';
import {useState, React, useEffect} from 'react'
import axios from 'axios';

const URL = "http://localhost:3002";

function App(props) {
  
const [message, setMessage] = useState("")
const [posts, setPosts] = useState([{
  user: "name",
  content: "message",
  timestamp: Date.now(),
  num_likes: "3"
}])
function Posts(props){
  return(
    <div className='Posts'>
        <h3> {props.user} </h3>
        <p> {props.content} - Time: {props.timestamp} - Likes: {props.num_likes}</p>
        <p>{props.timestamp}</p>
    </div>
  );
}
/*
    

function CreatePost(props)  {
 <div>
   <input className = "CreatePost" type="text" value={props.newPost} onChange={(e)=>props.setNewPost(e.target.value)} placeholder="type"></input>
   
   <button onClick={()=>{props.addPost();}}>Post</button>
 </div>

}






  const getPosts = () => {
    axios.get(URL + "/feed")
      .then(response => {
        setMessage(response.data);
        setPosts(response.data);
      })
      .catch(console.error)
  }
  
  
  function addPost(){
    if(message === ""){
      alert("Please enter a message");
    }
    axios.post(URL + "/feed/new", {
      content: message,
      user: "name"
    }).then(response => {
      console.log(response);
      getPosts();
    })
    .catch(console.error);
    setMessage("");
  }
  */
 // useEffect(() => {}, [message]);
  return (
    <div>
      <h1>EasyRide</h1>
      {posts.map((post, i) => 
        <div key={i}>
          <Posts user={post.user} content={post.content} timestamp={post.timestamp} num_likes={post.num_likes} > </Posts>
        </div>        
      ).reverse()}
    </div>
  );
}

export default App;
