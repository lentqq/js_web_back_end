const express = require('express');
const config = require('./config');
const apiRouter = require('./api');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.set('json replaser', (key, value) =>{
if (key === 'password') { return undefined; }
return value;
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
});

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});