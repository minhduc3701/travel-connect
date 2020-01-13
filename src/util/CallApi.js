import axios from "axios";
import {
  API_PROFILE_COMPANY,
  API_USER_DETAIL,
  API_ACCOUNT
} from "../constants/NavigateLink";

export function CallApi(endpoint, method = "GET", body) {
  let tokenID = JSON.parse(localStorage.getItem("request_token"));
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

export function CallApi_USER(endpoint, method = "GET", body) {
  let tokenID = JSON.parse(localStorage.getItem("request_token"));
  return axios({
    method: method,
    url: `${API_USER_DETAIL}/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${tokenID}`
    }
  }).catch(err => {
    console.log(err);
  });
}

export function CallApi_ACCOUNT(endpoint, method = "GET", body) {
  let tokenID = JSON.parse(localStorage.getItem("request_token"));
  return axios({
    method: method,
    url: `${API_ACCOUNT}/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${tokenID}`
    }
  }).catch(err => {
    console.log(err);
  });
}
