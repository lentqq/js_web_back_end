// setTimeout(function() {
//     console.log('Hello Nik!');
// },10000);
// console.log('I have to be a second?!');
const _ = require('lodash');
const fileManager = require('./file-manager');

fileManager.readUsers(function(err, content) {
    if (err) {
        console.error(err);
        return;
    }
    const userArray = content.split(',');
    console.log(_.chunk(userArray, 3));
});
console.log('Hello Batka!');