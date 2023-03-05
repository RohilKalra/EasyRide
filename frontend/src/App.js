import './App.css';
import {useState, React, useEffect} from 'react'
import axios from 'axios';
const URL = "http://localhost:3002";

function App(props) {
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [num_riders, setRiders] = useState("");
  const [locationTo, setLocationTo] = useState("");
  const [username, setUsername] = useState("");
  const [locationFrom, setLocationFrom] = useState("");
const [posts, setPosts] = useState([
  {

  }
]);
function Posts(props){
  return(
    <div className='Posts'>
        <h3> {props.user} </h3>
        <p> Date: {props.date} - Time: {props.timestamp} </p>
        <p>From: {props.locationFrom} - To: {props.locationTo}</p>
        <p>Number of Riders: {props.num_riders}</p>
        <p>Description: {props.description}</p>
    </div>
  );
}


  const getPosts = () => {
    axios.get(URL + "/feed")
      .then(response => {
        setPosts(response.data);
      })
      .catch(console.error)
  }
  
  
  function addPost(){
    if(username === "" || date === "" || time === "" || locationFrom === "" || locationTo === "" || num_riders === "" ){
      alert("Please provide input for all of the required fields.");
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
  }
  
  useEffect(() => {}, [date, time, description, num_riders, locationFrom, locationTo, username]);
  return (
    <div>
      <h1>EasyRide</h1>
      <input  type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Name:"></input>
      <input  type="text" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Date:"></input>
      <input  type="text" value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Time:"></input>
      <input  type="text" value={locationFrom} onChange={(e)=>setLocationFrom(e.target.value)} placeholder="Location from:"></input>
      <input  type="text" value={locationTo} onChange={(e)=>setLocationTo(e.target.value)} placeholder="Location to:"></input>
      <input  type="text" value={num_riders} onChange={(e)=>setRiders(e.target.value)} placeholder="Number of riders:"></input>
      <input  type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description:"></input>
   <button onClick={()=>{addPost();}}>Post</button>
   
      {posts.map((post, i) => 
        <div key={i}>
          <Ride user={username} locationFrom={locationFrom} time={time} locationTo={locationTo} date={date} num_riders={num_riders} description={description}/>
        </div>        
      ).reverse()}
    </div>
  );
}

export default App;
