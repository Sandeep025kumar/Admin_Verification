const express = require('express');
const { createData, logIn, updateData } = require('../controller/controller');
const verification = require('../middleware/verfication');
const router = express.Router();
router.post('/create',createData);
router.post('/login',logIn);
router.put('/update/:id',verification,updateData);
module.exports = router;