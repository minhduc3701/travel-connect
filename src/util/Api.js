import axios from 'axios';

export default axios.create({
  baseURL: `https://us-central1-dolars-b4178.cloudfunctions.net/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});
