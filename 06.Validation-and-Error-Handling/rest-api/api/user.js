const router = require('express').Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.User.find()
  .then(users => res.send(users))
  .catch(next);
});

module.exports = router;