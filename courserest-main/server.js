const express = require('express');
const assert = require('assert');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.json').mongo_uri;
const PORT = Number(process.env.PORT || require('./config.json').port);
const courseRoute = require('./route');

const app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// db connection
//db connection
mongoose.Promise = global.Promise;
mongoose
  .connect(config, { useNewUrlParser: true })
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => assert.equal(err, null));
app.use(cors());

app.use('/',courseRoute);

app.listen(PORT, ()=> {
    console.log(`server is running in http://localhost:${PORT}`);
});