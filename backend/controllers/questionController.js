
const Question = require("../models/Question");
const Session = require("../models/Session");

// Add a question to a session
const addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, question } = req.body;

    if(!sessionId || !question || !Array.isArray(question)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if session exists
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      question.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    )

    // Update session with new questions
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    // Return new questions
    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle pin question
const togglePinQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if question exists
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ success:false, message: "Question not found" });
    }

    // Toggle pin
    existingQuestion.isPinned = !existingQuestion.isPinned;
    await existingQuestion.save();

    // Return updated question
    res.status(200).json({success:true, existingQuestion});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update question node
const updateQuestionNode = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    // Check if question exists
    const existingQuestion = await Question.findById(id);
    if (!existingQuestion) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Update question node
    existingQuestion.note = note || "";
    await existingQuestion.save();

    // Return updated question
    res.status(200).json({ success:true, existingQuestion});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addQuestionToSession,
  togglePinQuestion,
  updateQuestionNode,
};
