import express, { Request, Response } from "express";
import quizAxiosClient from "../api/quizServiceApi";

const router = express.Router();

router.get("/quiz", async (req: Request, res: Response) => {
  try {
    const result = await quizAxiosClient.get("/quiz");
    console.log(result.data);
    res.status(200).send(result.data);
  } catch (err: any) {
    if (err.response && err.response.status)
      res.status(err.response.status).json({ err: err.response });
    res.status(500).json({ err: "Could not get quizzes" });
  }
});

router.get("/quiz/:quizId", async (req: Request, res: Response) => {
  try {
    const result = await quizAxiosClient.get(`/quiz/${req.params.quizId}`);
    res.status(result.status).send(result.data);
  } catch (err: any) {
    if (err.response && err.response.status)
      res.status(err.response.status).json({ err: err.response });
    res.status(500).json({ err: "Could not get specific quiz" });
  }
});

router.post("/quiz", async (req: Request, res: Response) => {
  try {
    const result = await quizAxiosClient.post("quiz",req.body);
    res.status(result.status).send(result.data);
  } catch (err: any) {
    if (err.response && err.response.status)
      res.status(err.response.status).json({ err: err.response });
    res.status(500).json({ err: "Could not get specific quiz" });
  }
});

export default router;
