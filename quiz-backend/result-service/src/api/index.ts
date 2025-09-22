import axios from "axios";
import dotenv from 'dotenv';
//For env File 
dotenv.config();


const ApiGateAwayClient = axios.create({
    baseURL: process.env.API_GATEAWAY_URL
})


export default ApiGateAwayClient;