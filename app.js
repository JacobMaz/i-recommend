require('dotenv').config();
const express = require('express');

const app = express();

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname);
// app.get('/', (req, res) => res.render('index'));

app.listen(process.env.PORT, ()=> console.log(`[SERVER:] App is listening on Port ${process.env.PORT}`))