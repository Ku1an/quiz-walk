import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//Routes

import quizRoute from "./routes/quizSvcRoutes"


//For env File 
dotenv.config();


const app: Application = express();
const port = process.env.API_GATEAWAY_PORT || 3001;

app.use(express.json())

app.use("/api/v1", quizRoute)


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});