import express, { Request, Response } from "express";

import { postQuizSchema } from "../validations/quizValidation";
import { z } from "zod";

//QuizService
import QuizService from "../classes/QuizService";

const router = express.Router();


//Returns ALL quizz titles and their ID
router.get("/quiz", async (req: Request, res: Response) => {
    try {
        const quizsvc = new QuizService()
        const results = await quizsvc.getQuizzes()
        res.status(200).json(results)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error occurred while retrieving Quizzes"})
    }
})

//Returns specific quiz with their respective questions etc
router.get("/quiz/:quizId", async (req: Request, res: Response) => {
    try {
        const quizsvc = new QuizService()
        const result = await quizsvc.getQuizById(req.params.quizId)
        if(!result) {
            res.status(404).json({err: "Object not found"})
        }
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error occurred while retrieving Quiz"})
    }
})

router.get("/quiz/:quizId/answers", async (req: Request, res: Response) => {
        try {
        const quizsvc = new QuizService()
        const result = await quizsvc.getQuizAnswersById(req.params.quizId)
        if(!result) {
            res.status(404).json({err: "Answers not found"})
        }
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error occurred while retrieving Quiz"})
    }
})


//Creates quiz, Needs questions, title, and what is correct and not
router.post("/quiz", (req: Request, res: Response) => {
    try {
        const quizPost = req.body
        postQuizSchema.parse(quizPost)
        //Quiz validated now save quiz in Mongo
        const quizsvc = new QuizService()
        quizsvc.saveQuiz(quizPost)
        res.status(201).send("OK")
    } catch (error) {
        if(error instanceof z.ZodError) {
            console.log(error)
            res.status(400).json({err: "Bad Api Request"})

        }
        else {
            res.status(500).json({err: "Internal Server Problem"})

        }

    }
})


export default router;