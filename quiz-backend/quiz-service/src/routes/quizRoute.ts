import express, { Request, Response } from "express";

import { postQuizSchema } from "../validations/quizValidation";
import { z } from "zod";

const router = express.Router();


//Returns ALL quizz titles and their ID
router.get("/quiz", (req: Request, res: Response) => {
    return res.send("hello")
})

//Returns specific quiz with their respective questions etc
router.get("/quiz/:quizId", (req: Request, res: Response) => {
    return res.send(req.params.quizId)
})


//Creates quiz, Needs questions, title, and what is correct and not
router.post("/quiz", (req: Request, res: Response) => {
    try {
        const quizPost = req.body
        console.log(quizPost)
        postQuizSchema.parse(quizPost)
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