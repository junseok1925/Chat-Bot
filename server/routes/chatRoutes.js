const express = require('express');
const router = express.Router();
const { chatWithOpenAI } = require('../controllers/chatController');

router.post('/', chatWithOpenAI);

module.exports = router;
