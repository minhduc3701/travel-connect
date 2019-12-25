import axios from "axios";

export default axios.create({
  baseURL: `https://us-central1-travelconnectapp.cloudfunctions.net/v1`,
  headers: {
    "Content-Type": "application/json"
  }
});
// import axios from 'axios';

// export default axios.create({
//   baseURL: `https://us-central1-dolars-b4178.cloudfunctions.net/api`,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });
