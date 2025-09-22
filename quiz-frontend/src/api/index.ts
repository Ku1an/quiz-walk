import axios from "axios";

const ApiGateAwayClient = axios.create({
    baseURL: "http://localhost:8080/api/v1"
})


export default ApiGateAwayClient;