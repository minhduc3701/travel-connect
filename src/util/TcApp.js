import axios from "axios";

export default axios.create({
  baseURL: `https://us-central1-tc-appglobal.cloudfunctions.net/v1`,
  headers: {
    "Content-Type": "application/json"
  }
});
