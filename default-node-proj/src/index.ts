import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();


const app: Application = express();
const port = process.env.QUIZ_SERVICE_PORT || 3001;

app.use(express.json())


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});