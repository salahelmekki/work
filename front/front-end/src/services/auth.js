import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "http://localhost:8000/api/auth/login/";
export const login = async (data, history) => {
  return axios.post(API_URL, data).then((response) => {
    const Token = response.data.token;
    localStorage.setItem("token", Token);
    const currentUser = jwt_decode(Token);
    console.log(currentUser)
    localStorage.setItem("token", Token);
    if (Token) {
      history.push("/dashbord");
    }
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};
