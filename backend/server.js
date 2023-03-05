// require mongoose library (use require for node.js, import for other javascript situations)
const mongoose = require('mongoose');

// please replace <username> and <password>!
connection = "mongodb+srv://<username>:<password>@easyrideone.0gqx4ay.mongodb.net/?retryWrites=true&w=majority";

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