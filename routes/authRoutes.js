const { Router } = require("express");
const AuthController = require("../controllers/authController");

const router = Router();
const authController = new AuthController();

router.post("/google", authController.googleLogin);

module.exports = router;
