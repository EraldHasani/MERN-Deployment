const express = require('express');
const app= express();
const cors= require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use(cors( {
    origin: "http://localhost:5173",
    credentials: true,

}));
app.use(cookieParser());

require('./config/mongoose.config');

require('./routes/pirate.routes')(app);
require('./routes/user.routes')(app);


app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
