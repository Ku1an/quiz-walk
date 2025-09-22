import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
    quizTitle: String,
    questions: [
        {
            question: String,
            options: [ String ],
            answer: String
        }
    ]
})

export const Quiz = mongoose.model('Quiz', quizSchema)