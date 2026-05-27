const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiApiKey } = require("../config/env");

class GeminiService {
  constructor() {
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
  }

  async suggestReply(message) {
    try {
      const prompt = `Suggest a short, natural reply to the last message in a chat. Return only the reply text, no quotes or extra explanation.\n\nMessage: "${message}"`;

      const result = await this.model.generateContent(prompt);

      return result.response.text();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = GeminiService;
