import {React} from "react";

function Posts(props){
    return(
        <div className='Posts'>
            <h3> {props.user} </h3>
            <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width:'30%'}}><p style={{float:'left'}}> Date: {props.date}</p>  <p style={{paddingLeft: '160px',float:'left'}}>Time: {props.time} </p></div>
            <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width:'30%'}}>
            <br/>
            <div ><p style={{paddingTop:'20px'}}>From: {props.locationFrom} </p><p>To: {props.locationTo}</p></div>
            <p>Number of Riders: {props.num_riders}</p>
            <p>Description: {props.description}</p>
            </div>
        </div>
    );
}

  export default Posts;