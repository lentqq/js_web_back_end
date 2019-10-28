const env = process.env.NODE_ENV || 'development';
// const bodyParser = require('body-parser');

require('./config/database')().then(() => {
    const config = require('./config/config')[env];
    const app = require('express')();

    app.use(bodyParser.urlencoded({ extended: true }));

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port, console.log(`***Server is ready!Listening on port ${config.port}...***`));
});