import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
