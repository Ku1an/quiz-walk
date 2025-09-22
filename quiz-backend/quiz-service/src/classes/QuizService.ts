import { Quiz } from "../models/quizSchema";
import { PostQuiz } from "../validations/quizValidation";

class QuizService {

    public async saveQuiz(postQuiz: PostQuiz) {
        const quiz = new Quiz({
            quizTitle: postQuiz.quizTitle,
            questions: postQuiz.questions
        })

        try {
            await quiz.save()
            console.log("A quiz were succesfully saved: ", postQuiz)
            
        } catch (error) {
            console.error("Could not save quiz: ", error)
        }
    }

    //Returns their id and title, not questions
    public async getQuizzes() {
        console.log("Getting quizzes (titels and id)")
        const quizzes = await Quiz.find().select("_id quizTitle")
        return quizzes
    }

    public async getQuizById(id: String) {
        console.log("Getting quiz questions from quiz ID: ", id)
        const quiz = await Quiz.findById(id).select("_id quizTitle questions.question questions.options questions._id")
        return quiz
    }

    public async getQuizAnswersById(id: String) {
        console.log("Getting quiz answers from quiz ID: ", id)
        const answers = await Quiz.findById(id).select(
            "questions.answer questions._id"
        );
        return answers
    }

}

export default QuizService;