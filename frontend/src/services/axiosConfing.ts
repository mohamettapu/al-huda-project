import axios from "axios";
import { BASE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 ||
      error.response?.status === 400 ||
      error.response?.status === 500 ||
      (error.response?.status === 404 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      const userInfo = localStorage.getItem("userInfo");

      if (!userInfo) return Promise.reject(error);

      const parsedUserInfo = JSON.parse(userInfo);
      const { refreshToken } = parsedUserInfo;
      console.log("Refresh Token:", refreshToken);
      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}//user/new-access-token`,
          { refreshToken }
        );

        console.log("Refresh Response:", refreshResponse.data);

        const newToken = await refreshResponse.data.NewAccessToken;

        if (newToken) {
          const newUserInfo = { ...parsedUserInfo, accessToken: newToken };
          try {
            localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
          } catch (localStorageError) {
            console.error("Error updating localStorage:", localStorageError);
            return Promise.reject(localStorageError);
          }
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axios(originalRequest);
        } else {
          console.error("Failed to get a new access token.");
          return Promise.reject(new Error("Failed to get a new access token."));
        }
      } catch (err) {
        console.error("Error during token refresh:", err);
        return Promise.reject(err);
      }
    }
  }
);

export default apiClient;
