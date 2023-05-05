const express = require("express")
const  mongoose  = require("mongoose")
const app = express()
const port = 5000
const alertRoute = require('./routes/alertRoute')
const suggestionsRoute = require('./routes/suggestionsRoute')
const userRoute = require('./routes/userRoute')
const bodyParser = require("body-parser")
app.use(bodyParser.json());
const phoneRoute = require('./routes/phoneRoute')
require('dotenv').config()
const cors = require('cors')


mongoose.connect(process.env.DB,{useNewUrlParser:true})
        .then(()=>console.log('Connected to DB'))
        .catch((err)=>console.log(err))

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods','*')
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
    });

app.use(bodyParser.json());
app.use('/api/alerts', alertRoute)
app.use('/api/user',userRoute)
app.use('/api/suggestions',suggestionsRoute)
app.use('/api/phone',phoneRoute)

app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
