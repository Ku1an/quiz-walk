import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();


const quizBaseUrl = process.env.QUIZ_BASE_URL || "";


const quizAxiosClient = axios.create({
    baseURL: quizBaseUrl
})


export default quizAxiosClient;