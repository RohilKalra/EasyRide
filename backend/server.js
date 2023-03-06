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
app.post('/feed/new', (req, res) => {
    // console.log("test!!!!!!!!!")
    console.log("Time: " + req.body.time);
    console.log("Date: " + req.body.date);
    console.log('\n');


    const hourMinuteArray = (req.body.time).split(":");
    const hour = parseInt(hourMinuteArray[0]);
    const minute = parseInt(hourMinuteArray[1]);

    const monthDayYearArray = (req.body.date).split('/');
    const month = parseInt(monthDayYearArray[0]);
    const day = parseInt(monthDayYearArray[1]);
    const year = parseInt(monthDayYearArray[2]);

    const ride = new Ride({
        date: req.body.date,
        dateString: req.body.date.toString(),
        time: req.body.time,
        username: req.body.username,
        locationFrom: req.body.locationFrom,
        locationTo: req.body.locationTo,
        description: req.body.description,
        num_riders: req.body.num_riders,
        phone_number: req.body.phone_number
    });
    console.log("test");
    console.log(ride.date.toString());
    console.log(ride.time);
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

app.get('/feed/getTimeWithinOneHour/:date/:time', async(req,res) => {
    let thirtyMinsToMs = 30 * 60000; 

    const desiredDate = (req.params.date).split('-');
    const month = parseInt(desiredDate[0]);
    const day = parseInt(desiredDate[1]);
    const year = parseInt(desiredDate[2]);

    const desiredTime = (req.params.time).split(":");
    const hour = parseInt(desiredTime[0]);
    const minute = parseInt(desiredTime[1]);

    let updatedBeforeHour;
    let updatedBeforeMinute;
    let updatedAfterHour;
    let updatedAfterMinute;

    if(minute < 30) {
        updatedBeforeHour = hour - 1;
        updatedBeforeMinute = 30 + minute;
        updatedAfterHour = hour;
        updatedAfterMinute = 30 + minute;
    } else if(minute == 30) {
        updatedBeforeHour = hour;
        updatedBeforeMinute = 0;
        updatedAfterHour = hour + 1;
        updatedAfterMinute = 0;
    } else {
        updatedAfterHour = hour + 1;
        updatedAfterMinute = minute - 30;
        updatedBeforeHour = hour;
        updatedBeforeMinute = minute - 30; 
    }


    const dateThirtyBefore = new Date(year,month,day,updatedBeforeHour,updatedBeforeMinute);
    const dateThirtyAfter = new Date(year,month,day,updatedAfterHour,updatedAfterMinute);
    console.log(dateThirtyBefore.toString());
    console.log(dateThirtyAfter.toString());

    const values = await Ride.find({date: { $gte : dateThirtyBefore, $lte : dateThirtyAfter}});
    res.json(values);
})

app.delete('/feed/deleteAll', async(req, res) => {
    console.log("test");
    await Ride.deleteMany();
    res.json({message :'worked'});
});

