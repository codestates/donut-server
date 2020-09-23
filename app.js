const express = require('express');

const app = express();
const port = 4000;

app.use('/', (req, res) => res.send('success'));

app.listen(port, () => {
    console.log(`listening port ${port}`);
})