import axios from "axios";

const axiosInstance = axios.create({
  // Make sure this matches your backend endpoint
  // baseURL: "http://127.0.0.1:5001/clone-8a861/us-central1/api",

  baseURL:"https://amazon-api-deploy-vrs7.onrender.com/"
});

export { axiosInstance };