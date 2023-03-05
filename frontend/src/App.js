import './App.css';
import {useState, React, useEffect} from 'react'
import axios from 'axios';

const URL = "http://localhost:3001";

function App(props) {
  
const [message, setMessage] = useState("")
const [posts, setPosts] = useState([])

    

function CreatePost(props)  {
 <div>
   <input className = "CreatePost" type="text" value={props.newPost} onChange={(e)=>props.setNewPost(e.target.value)} placeholder="type"></input>
   
   <button onClick={()=>{props.addPost();}}>Post</button>
 </div>

}


function Posts(props){
  return(
    <div className='Posts'>
        <h3> {props.user} </h3>
        <p> {props.content} - Time: {props.timestamp} - Likes: {props.num_likes}</p>
        <p>{props.timestamp}</p>
    </div>
  );
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
  
  useEffect(() => {}, [message]);
  return (
    <div>
      <CreatePost newPost={message} setNewPost={setMessage} addPost={addPost}/>
      {posts.map((post, i) => 
        <div key={i}>
          <Posts user={post.user} content={post.content} timestamp={post.timestamp} > </Posts>
        </div>        
      )}.reverse();
    </div>
  );
}

export default App;
