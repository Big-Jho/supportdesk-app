import axios from "axios";

const API_URL = "/api/user";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  const requiredProps = ["name", "email", "token"];
  const isValid = requiredProps.every((prop) => prop in response.data);

  if (isValid) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };

export default authService;
