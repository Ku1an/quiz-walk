import mongoose from "mongoose";


const quizAnswerSchema = new mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref:"Quiz"},
    user: String,
    answers: {
        type: Map,
        of: String
    },
    correctCount: Number,
    submittedAt: {type: Date, default: Date.now()}
})

export const SubmitQuiz = mongoose.model('QuizAnswer', quizAnswerSchema)