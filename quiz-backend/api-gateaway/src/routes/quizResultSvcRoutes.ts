import express, { Request, Response } from "express";
import quizResultAxiosClient from "../api/quizResultApi";

const router = express.Router();

router.post("/submissions", async (req: Request, res: Response) => {
  try {
    const result = await quizResultAxiosClient.post("/submissions", req.body);
    res.status(result.status).send(result.data);
  } catch (err: any) {
    if (err.response && err.response.status)
      res.status(err.response.status).json({ err: err.response });
    res.status(500).json({ err: "Could not submit quiz answer" });
  }
});

router.get("/submissions/leaderboard", async (req: Request, res: Response) => {
  try {
    const result = await quizResultAxiosClient.get("/submissions/leaderboard");
    res.status(result.status).send(result.data);
  } catch (err: any) {
    if (err.response && err.response.status)
      res.status(err.response.status).json({ err: err.response });
    res.status(500).json({ err: "Could not retrive quiz leaderboard" });
  }
});

router.get("/submissions/leaderboard/:quizId", async (req: Request, res: Response) => {
  try {
    const result = await quizResultAxiosClient.get(`/submissions/leaderboard/${req.params.quizId}`);
    res.status(result.status).send(result.data);
  } catch (err: any) {
    if (err.response && err.response.status)
      res.status(err.response.status).json({ err: err.response });
    res.status(500).json({ err: "Could not retrive quiz leaderboard" });
  }
});

export default router;
