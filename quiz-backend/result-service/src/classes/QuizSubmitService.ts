//Mongoose models
import { SubmitQuiz } from "../models/quizSubmitSchema";
import { Quiz } from "../models/quizSchema";

//Validations
import {
  PostSubmitQuiz,
  SavedSubmisson,
} from "../validations/quizSubmitValidation";

class QuizSubmitService {
  public correct: Number = 0;

  public async saveSubmit(submitQuiz: PostSubmitQuiz) {
    try {
      const correctedSubmit = await this.countCorrectAnwers(submitQuiz);
      if (correctedSubmit) {
        const submitQuiz = new SubmitQuiz({
          quizId: correctedSubmit.quizId,
          user: correctedSubmit.user,
          answers: correctedSubmit.answers,
          correctCount: correctedSubmit.correctCount,
        });
        this.correct = correctedSubmit.correctCount
        submitQuiz.save();
        console.log("A quiz answer were succesfully saved: ", correctedSubmit);
      } else {
        throw Error("Could not count correct answers, returned NULL");
      }
    } catch (error) {
      console.error("Could not save quiz: ", error);
    }
  }

  private async countCorrectAnwers(
    submitQuiz: PostSubmitQuiz
  ): Promise<SavedSubmisson | undefined> {
    try {
      let correctAnswers = 0;
      const result = await Quiz.findById(submitQuiz.quizId).select(
        "questions.answer questions._id"
      );
      if (result) {
        for (let item of result.questions) {
          const correctAnswer = item.answer;
          const questionId = item._id.toString();
          submitQuiz.answers[questionId] === correctAnswer
            ? (correctAnswers += 1)
            : null;
        }
      }
      let submisson: SavedSubmisson = {
        ...submitQuiz,
        correctCount: correctAnswers,
      };
      return submisson;
    } catch (error) {
      console.error("Could not save submit: ", error);
    }
    return undefined;
  }

  public async getAllLeaderBoards() {
    try {
      const result = await SubmitQuiz.aggregate([
        { $sort: { quizId: 1, correctCount: -1 } },
        {
          $group: {
            _id: "$quizId",
            leaderboard: { $push: {
                user: "$user",
                correctCount: "$correctCount"
            } }, 
          },
        },
      ]);
      return result
    } catch (error) {
      console.error("Could not retrive all leaderboards");
    }
  }

  public async getLeaderboardById(id: string) {
    try {
      const result = await SubmitQuiz.find({ quizId: id })
        .select("_id quizId user correctCount")
        .sort({
          correctCount: -1,
        });
      return result;
    } catch (error) {
      console.error("Could not retrive leaderboard by id");
    }
  }
}

export default QuizSubmitService;
