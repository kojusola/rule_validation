const router = require("express").Router()

const {ruleValidation} = require('../controllers/ruleValidationController');

router.route('/').post(ruleValidation);

module.exports = router;