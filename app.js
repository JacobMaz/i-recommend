require('dotenv').config();
const express = require('express');
const app = express();
const controllers = require('./controllers');
const db = require('./db');
const validateSession = require('./middleware/validateSession')

app.use(require('./middleware/headers'));
app.use(express.json());
app.use('/user', controllers.usercontroller);
app.use('/food', controllers.foodcontroller);

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