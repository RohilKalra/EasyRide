// express.js, will make working with apis easier (framework)
const express = require('express');

// require mongoose library (use require for node.js, import for other javascript situations)
const mongoose = require('mongoose');

const cors = require('cors');

// please replace <username> and <password>!
connection = "mongodb+srv://demo:1234@easyrideone.0gqx4ay.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose
    .connect(connection,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ) 
    .then(() => console.log("Connected to MongoDB")) 
    .catch(console.error)
;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app = express();
app.use(express.json()); // when I'm receiving information, format it in the JSON format.
app.use(cors());

app.listen(8080, () => console.log('Server listening on port 8080')); // first parameter is port, second parameter is what to do after setup.

// mongoose specific

// where we connect

// add a post
const Ride = require('./models/Ride'); // import our Ride schema

// using express! -> gets all posts and returns all 
app.get('/feed', async (req, res) => {
    const feed = await Ride.find(); // look at the collection that matches the post schema and get all of the results
    
    res.json(feed); // once we are done, plug it into feed and store it into res with the JSON format
    
});
// req res is express syntax!
app.post('/feed/new', (req, res) => {
    const ride = new Ride({
        date: req.body.date,
        time: req.body.time,
        username: req.body.username,
        locationFrom: req.body.locationFrom,
        locationTo: req.body.locationTo,
        description: req.body.description,
        num_riders: req.body.num_riders,
    });
    ride.save();
    res.json(ride);
});

app.delete('/feed/delete/:id', async(req, res) => {
    const rideId = req.params.id;
    let ride = await Ride.findById(rideId);
    await ride.remove();
    res.json(result);
});

