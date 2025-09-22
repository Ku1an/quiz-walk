import { z } from "zod";


export const postQuizSubmitSchema = z.strictObject({
    quizId: z.string().min(1, "Quiz title must be provided"),
    user: z.string().min(1),
    answers: z.record(z.string(),z.string())
})

export type PostSubmitQuiz = z.infer<typeof postQuizSubmitSchema>

export type SavedSubmisson = PostSubmitQuiz & {
    correctCount: number;
}
