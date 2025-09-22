import express, { Request, Response } from "express";


import { postQuizSubmitSchema } from "../validations/quizSubmitValidation";
import { z } from "zod";

//QuizSubmitService
import QuizSubmitService from "../classes/QuizSubmitService";

const router = express.Router();

router.get("/submissions/leaderboard/:quizId", async (req: Request, res: Response) => {
    try {
        const quizId = req.params.quizId
        const submitQuizSvc = new QuizSubmitService()
        const result = await submitQuizSvc.getLeaderboardById(quizId)
        if(!result) {
            res.status(404).json({err: "Object not found"})
        }
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error occurred while retrieving Quiz"})
    }
})

//Returns all leaderboard for all unqiez quiz ids
router.get("/submissions/leaderboard", async (req: Request, res: Response) => {
    try {
        const submitQuizSvc = new QuizSubmitService()
        const result = await submitQuizSvc.getAllLeaderBoards()
        if(!result) {
            res.status(404).json({err: "Object not found"})
        }
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "An error occurred while retrieving Quiz"})
    }
})


//Submits quiz answer, corrects it and stores it
router.post("/submissions", async (req: Request, res: Response) => {
    try {
        const quizPost = req.body
        postQuizSubmitSchema.parse(quizPost)
        //Save in mongodb
        const submitQuiz = new QuizSubmitService()
        await submitQuiz.saveSubmit(quizPost)
        res.status(201).json({correct: submitQuiz.correct})
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