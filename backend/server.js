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

app.listen(3002, () => console.log('Server listening on port 3002')); // first parameter is port, second parameter is what to do after setup.

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
app.post('/feed/post', (req, res) => {
    console.log("test!!!!!!!!!")
    const hourMinuteArray = (req.body.time).split(":");
    const hour = parseInt(hourMinuteArray[0]);
    const minute = parseInt(hourMinuteArray[1]);

    const monthDayYearArray = (req.body.date).split('/');
    const month = parseInt(monthDayYearArray[0]);
    const day = parseInt(monthDayYearArray[1]);
    const year = parseInt(monthDayYearArray[2]);

    const ride = new Ride({
        date: new Date(year,month,day,hour,minute),
        username: req.body.username,
        locationFrom: req.body.locationFrom,
        locationTo: req.body.locationTo,
        description: req.body.description,
        num_riders: req.body.num_riders,
        phone_number: req.body.phone_number
    });
    console.log("test")
    console.log(ride.date.toString());
    ride.save();
    res.json(ride);
});

app.delete('/feed/delete/:id', async(req, res) => {
    const rideId = req.params.id;
    let ride = await Ride.findById(rideId);
    await ride.deleteOne();
    res.json({deleted: "succesful"});
});

app.put('/feed/put/:id/increase', async(req, res) => {
    const rideId = req.params.id;
    let ride = await Ride.findById(rideId);
    ride.num_riders = ride.num_riders+1;
    res.json(ride);
});

app.put('/feed/put/:id/decrease', async(req, res) => {
    const rideId = req.params.id;
    let ride = await Ride.findById(rideId);
    ride.num_riders = ride.num_riders-1;
    res.json(ride);
});

//finds all rides which are going to a location
app.get('/feed/getToLocation/:toLocation', async(req,res) => {
    const desiredLocation = req.params.toLocation;
    const values = await Ride.find({locationTo : {$regex : desiredLocation}});
    res.json(values);
})

app.get('/feed/getFromLocation/:FromLocation', async(req,res) => {
    const desiredLocation = req.params.FromLocation;
    const values = await Ride.find({locationTo : {$regex : desiredLocation}});
    res.json(values);
})

app.get('/feed/getTimeWithinOneHour/:time', async(req,res) => {
    let desiredTime = ParseInt(req.params.time);
    let lowerBoundTime;
    let upperBoundTime;

    if(lowerBoundTime < 30) {
       
    }
    const values = await Ride.find({time: { $gt : desiredTime-30, $lt : desiredTime+30}});
    res.json(values);
})

