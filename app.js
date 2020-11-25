require('dotenv').config();
const express = require('express');
const app = express();
const controllers = require('./controllers');
const db = require('./db');

app.use(express.json())
app.use('/user', controllers.usercontroller)

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
// app.get('/', (req, res) => res.render('index'));

db.authenticate()
.then(()=>db.sync())
.then(()=>{
    app.listen(process.env.PORT, ()=> console.log(`[SERVER:] App is listening on Port ${process.env.PORT}`))
})
.catch((err)=>{
    console.log('[SERVER:] Server Crashed');
    console.error(err);
})