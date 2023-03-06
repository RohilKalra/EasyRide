import './App.css';
import {useState, React, useEffect} from 'react'
import axios from 'axios';
const URL = "http://localhost:3002";

import Posts from './components/Posts.js';

function App(props) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [num_riders, setRiders] = useState();
  const [locationTo, setLocationTo] = useState("");
  const [username, setUsername] = useState("");
  const [locationFrom, setLocationFrom] = useState("");

  function resetInput() {
    setDate("");
    setTime("");
    setDescription("");
    setRiders("");
    setLocationTo("");
    setLocationFrom("");
    setUsername("");
  }
const [posts, setPosts] = useState([
  {

  }
]);



  const getPosts = () => {
    axios.get(URL + "/feed")
      .then(response => {
        setPosts(response.data);
      })
      .catch(console.error)
  }

  useEffect(() => { 
    getPosts();
  }, [posts]);
  
  
  function addPost(){
    if(username === "" || date === "" || time === "" || locationFrom === "" || locationTo === "" || num_riders === "" ){
      alert("Please provide input for all of the required fields.");
      return;
    }
    axios.post(URL + "/feed/new", {
      time: time,
      username: username,
      date: date,
      description: description,
      num_riders: num_riders,
      locationFrom: locationFrom,
      locationTo: locationTo
    }).then(response => {
      console.log(response);
      getPosts();
    })
    .catch(console.error);

    resetInput();
  }
  
  useEffect(() => {}, [date, time, description, num_riders, locationFrom, locationTo, username]);
  return (
    <div>
      <h1>EasyRide</h1>
      <input style={{margin:'4px'}} type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Name:"></input>
      <input style={{margin:'4px'}} type="text" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Date:"></input>
      <input style={{margin:'4px'}}  type="text" value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Time:"></input>
      <input style={{margin:'4px'}} type="text" value={locationFrom} onChange={(e)=>setLocationFrom(e.target.value)} placeholder="Location from:"></input>
      <input style={{margin:'4px'}}  type="text" value={locationTo} onChange={(e)=>setLocationTo(e.target.value)} placeholder="Location to:"></input>
      <input style={{margin:'4px'}} type="text" value={num_riders} onChange={(e)=>setRiders(e.target.value)} placeholder="Number of riders:"></input>
      <input style={{margin:'4px'}}  type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description:"></input>
   <br/><button onClick={()=>{addPost();}} style={{width:'600px', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '40%', marginTop:'20px'}}>Post</button>

   
      {posts.map((post, i) => 
        <div key={i}>
          <Posts user={post.username} locationFrom={post.locationFrom} time={post.time} locationTo={post.locationTo} date={post.dateString} num_riders={post.num_riders} description={post.description}/>
        </div>        
      ).reverse()}
    </div>
  );
}

export default App;
