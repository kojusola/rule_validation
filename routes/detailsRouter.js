const router = require("express").Router()
const {details} = require('../controllers/detailsController')

router.route( '/').get(details);

module.exports = router;