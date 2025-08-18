const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const userMiddleware = require('../middlewares/user-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')

router.use("/user", userMiddleware, userRoutes);
router.use("/admin", adminMiddleware,  adminRoutes);

module.exports = router;