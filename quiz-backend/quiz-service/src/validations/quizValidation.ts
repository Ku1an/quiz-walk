import { z } from "zod";

const questionSchema = z.strictObject({
    question: z.string().min(1, "Question required"),
    options: z.array(z.string()).min(3).max(3),
    answer: z.string()
})

export const postQuizSchema = z.strictObject({
    quizTitle: z.string().min(1, "Quiz title must be provided"),
    questions: z.array(questionSchema).min(1)


})
