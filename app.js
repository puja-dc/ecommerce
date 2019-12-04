const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Database Connected!'));

// Routes
app.get('/', (req, res) => {
  res.send('Heylo from node, take 2');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
