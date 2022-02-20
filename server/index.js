require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const canvasRoutes = require('./routes/savedata');
const bodyParser = require('body-parser')


//database connection
connection();

//middleware 
app.use(cors());


app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000, type: 'application/x-www-form-urlencoded' }));


//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/canvas", canvasRoutes)



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening in port ${port}`));
