const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express(); 
const port = process.env.PORT || 3001;
// Built-in Express body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));




mongodb.initDb((err) => {
    if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
  console.log(`Database is listening and node server is running on http://localhost:${port}`);
});
  }
})
