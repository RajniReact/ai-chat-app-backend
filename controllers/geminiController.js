const GeminiService = require("../services/GeminiService");

class GeminiController {
  constructor() {
    this.geminiService = new GeminiService();
  }

  suggestReply = async (req, res) => {
    try {
      const { message } = req.body;

      const reply = await this.geminiService.suggestReply(message);

      res.json({ success: true, reply });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  };
}

module.exports = GeminiController;
