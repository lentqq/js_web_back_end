const router = require('express').Router();
const models = require('../models');
const userRouter = require('./user');

router.post('/register', (req, res) => {
const { email, firstName, lastName, password } = req.body;
models.User.create({ email, firstName, lastName, password })
.then((user) => res.send(user))
.catch(next);
});

router.get('/', (req, res) => {
    res.send('Hello Niksy');
});

router.use('/user', userRouter);

module.exports = router;