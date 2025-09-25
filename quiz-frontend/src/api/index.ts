import axios from "axios";

const ApiGateAwayClient = axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_BASE_URL
})

// "http://localhost:8080/api/v1"
export default ApiGateAwayClient;