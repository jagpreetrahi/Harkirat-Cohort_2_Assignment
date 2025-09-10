const express = require('express');
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const router = express.Router();

router.use('/admin' , adminRoutes)
router.use('/user' , userRoutes)

module.exports = router;