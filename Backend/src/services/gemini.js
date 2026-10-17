const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

function getModel(options = {}) {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite", // free tier friendly; use "gemini-2.5-flash-lite" for higher rate limits
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.3,
    maxOutputTokens: 8000,
    maxRetries: 2,
    ...options,
  });
}

module.exports = { getModel };