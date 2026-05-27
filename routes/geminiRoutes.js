const { Router } = require("express");
const GeminiController = require("../controllers/geminiController");

const router = Router();
const geminiController = new GeminiController();

router.post("/suggest-reply", geminiController.suggestReply);

module.exports = router;
