const express = require('express');
const {json, urlencoded} = require('body-parser')
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const { PORT } = require('./config/env');
const app = express();


mongoose.connect('mongodb+srv://teste:teste@cluster0-hqw9s.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('mongo connected')
}).catch(err=>{
    console.log(err)
})

//midllewares globais
app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));
app.use(routes);

app.listen(PORT , ()=> console.log(`server listing in localhost:${PORT}`))