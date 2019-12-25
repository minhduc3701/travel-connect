import axios from "axios";
import { API_PROFILE_COMPANY } from "../constants/NavigateLink";

let tokenID = JSON.parse(localStorage.getItem("token"));

export default function CallApi(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_PROFILE_COMPANY}/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${tokenID}`
    }
  }).catch(err => {
    console.log(err);
  });
}
