const db = require('./db');
db.then(() => {
 console.log('Connected to db successfuly');
 require('./models/main');
});