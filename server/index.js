const express = require("express");
const app = express();
const port = 3001;

const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

require('dotenv').config()

const dbURL = process.env.MONGO_URL;
const jwtSecretKey = process.env.JWT_KEY;
// const User = require("./models/user");
// const { Player, CashOut, CashIn, Message } = require("./models/playerData");
const authCheck = require('./authCheck');


app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbURL)
  .then((result) => app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  }))
  .catch((err) => console.log(err))

let token;

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    next();
  } else {
    res.redirect('/');
  }
});

app.get('/api/apiTest', (req, res) => {
  res.status(200).json({message: "Running"})
})

app.get('/api/checkSU', authCheck.checkSuperUser, async (req, res) => {
  token = '';
  token = req.headers.authorization.split(' ')[1]

  const userData = {
    userName: req.superUser.userName,
    superUser: req.superUser.superuser
  }

  res.status(200).json({ userData })

});

app.get('/api/checkLoggedIn', authCheck.checkLoggedIn, async (req, res) => {
  token = '';
  token = req.headers.authorization.split(' ')[1]

  res.status(200).json({ });

});

