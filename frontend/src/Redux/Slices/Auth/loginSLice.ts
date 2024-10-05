import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";
import { ILoginPayload, ILoginResponse } from "../../../types/loginInterface";

const loginData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as ILoginResponse);
const initialState = {
  data: loginData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const LoginFN = createAsyncThunk(
  "auth/login",
  async (data: ILoginPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/user/login", data);

      if (res.data) {
        return res.data;
      } else {
        return rejectWithValue(res.data.msg || default_error_message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data.msg || default_error_message
        );
      }
      return rejectWithValue(default_error_message);
    }
  }
);

export const LoginSLice = createSlice({
  name: "Login Slice",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {} as ILoginResponse;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";

      localStorage.removeItem("userInfo");
    },
  },
  extraReducers(builder) {
    builder.addCase(LoginFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as ILoginResponse;
    });
    builder.addCase(LoginFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(LoginFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as ILoginResponse;
    });
  },
});

export const { logout } = LoginSLice.actions;
