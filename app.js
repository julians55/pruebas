require('dotenv').config();
const express = require('express');
const http = require('http');
const configExpress = require('./config/express');
const routes = require('./routes');
const db = require('./api/index');

const app = express();

const server = http.Server(app);

app.use(express.urlencoded({extended: false}));
configExpress(app);
routes(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('ManageU API')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })