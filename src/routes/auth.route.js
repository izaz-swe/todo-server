const { Router } = require("express");
const { userRegistration, userLogin, verifyToken } = require("../controllers/auth.controller");

const router = Router();
router.post('/signup', userRegistration);
router.post('/login', userLogin);
router.post('/verifyToken', verifyToken);
module.exports = router; 