const { questionAnswerPrompt,conceptExplainPrompt } = require('../utils/prompts');

// Lazy load the ES module using dynamic import
let ai;

(async () => {
  const { GoogleGenAI } = await import('@google/genai');
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
})();

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if(!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt
    })

    let rawText = response.text;

    // Clean it: Remove ```json and``` from geggining and end

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Now safe to parse

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if(!question) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt
    })

    let rawText = response.text;

    // Clean it: Remove ```json and``` from geggining and end

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Now safe to parse

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { generateInterviewQuestions, generateConceptExplanation };

