import axios from "axios";

const initializeApp = () => {
  axios.defaults.baseURL = "https://trafficlearn-api.azurewebsites.net/api";
};

export default initializeApp;
