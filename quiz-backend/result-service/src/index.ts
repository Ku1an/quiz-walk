import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';


//Classes
import Quizdb from './classes/Quizdb';

//Routes
import quizSubmitRoute from "./routes/quizSubmitRoute"

//For env File 
dotenv.config();


console.log(process.env.QUIZ_DATABASE_URI)
const dbconn = process.env.QUIZ_DATABASE_URI ? new Quizdb(process.env.QUIZ_DATABASE_URI) : null


//Loop here, program will NOT work unless connected to db
if(dbconn instanceof Quizdb) {
    dbconn.connect()
    .then(() => {
        console.log("Connected to db...")
    })
}
else {
    console.log("ENV variable QUIZ_DATABASE_URI has not been set: ", process.env.QUIZ_DATABASE_URI)
}


const app: Application = express();
const port = process.env.QUIZ_SUBMIT_SERVICE_PORT || 3001;

app.use(express.json())
app.use(quizSubmitRoute)


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});