var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/users', require('./users'));
router.use('/car', require('./car'));

module.exports = router;
