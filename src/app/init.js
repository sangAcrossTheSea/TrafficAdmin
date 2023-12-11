import axios from "axios";

const initializeApp = () => {
  axios.defaults.baseURL = "https://trafficlearn-api.azurewebsites.net/api";
  // axios.defaults.baseURL = "https://localhost:7220/api";
};

export default initializeApp;
