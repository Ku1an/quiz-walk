import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();


const quizResultBaseUrl = process.env.QUIZ_RESULT_BASE_URL || "";


const quizResultAxiosClient = axios.create({
    baseURL: quizResultBaseUrl
})


export default quizResultAxiosClient;