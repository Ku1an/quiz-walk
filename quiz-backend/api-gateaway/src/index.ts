import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
//Routes

import quizRoute from "./routes/quizSvcRoutes"
import quizResultRoute from "./routes/quizResultSvcRoutes"
 

//For env File 
dotenv.config();


const app: Application = express();
const port = process.env.API_GATEAWAY_PORT || 3001;


// Allows all CORS, not considered to be a good security practice
//However, secuirty is not the focus for this assignment. 
app.use(cors({
    origin: "*",
}))
app.use(express.json())

app.use("/api/v1", quizRoute)
app.use("/api/v1", quizResultRoute)


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});