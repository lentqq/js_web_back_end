const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const options = { expiresIn: '2d' };
const secret = 'MySuperPrivateSecret';

const app = express();

function auth(authLevel) {
    return (req, res, next) => {
        const token = req.cookie['auth_cookie'];
        // const authUser = users.find(user => user.id === req.session.userId);
        const data = jwt.verify(token, secret);
        const authUser = users.find(user => user.id === data.userId);
        if (!authUser) {
            res.status(401).send('401');
            return;
        }
        req.user = authUser;
        next();
    }
}

app.use(session(
    { secret: 'my secret' },
    { httpOnly: true },
    { secure: false }
));

let users = [{
    id: 1,
    username: 'user1',
    password: '123'
}];

app.use(cookieParser());
app.use(bodyParser.urlencoded());

app.get('/protected', auth(4), (req, res) => {
    res.send('This is protected');
});

app.get('/logout', (req, res) => {

    // blacklist database table for all tokens that haven`t expired

    res.clearCookie('auth_cookie').redirect('/');
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send(err.message);
    //         return;
    //     }
    //     res.redirect('/');
    // });
});

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('pages', 'register.html'));
});

app.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user) {
        res.sendFile(path.resolve('pages', 'register.html'));
        return;
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            next(err);
            return;
        }
        users = users.concat({ id: 2, username, password: hash });
        res.redirect('/');
    });
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('pages', 'login.html'))
});

app.post('/login', (req, res, next) => {
    const authUser = users.find(user => user.username === req.body.username);
    if (!authUser) {
        res.sendFile(path.resolve('pages', 'login.html'));
        return;
    }
    bcrypt.compare(req.body.password, authUser.password).then(result => {
        if (!result) {
            res.sendFile(path.resolve('pages', 'login.html'));
            return;
        }
        const token = jwt.sign({ userId: authUser.id }, secret, options);
        // req.session.userId = authUser.id;
        res.cookie('auth_cookie', token).redirect('/');
    }).catch(next);
});


app.get('/', (req, res) => {
    res.send('Default page');
    // res.cookie('test_cookie', { test: 123 }).send('Hello');
    // res.locals;
});

app.listen(8080, () => {
    console.log('Server is listen on port 8080...');
});