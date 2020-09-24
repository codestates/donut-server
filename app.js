const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const { userRouter } = require('./routes');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use(morgan());


app.use('/user', userRouter);
app.use('/', (req, res) => res.send('success'));

app.listen(port, () => {
    console.log(`listening port ${port}`);
})