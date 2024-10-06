import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {
  ISignUpPayload,
  ISignUpResponse,
} from "../../../types/signUpInterfaces";

const loginData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as ISignUpResponse);
const initialState = {
  data: loginData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const signUpFN = createAsyncThunk(
  "auth/signUp",
  async (data: ISignUpPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/user/create-user", data);

      if (res.data) {
        return res.data;
      } else {
        return rejectWithValue(res.data?.msg || default_error_message);
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

export const signUpSlice = createSlice({
  name: "signUP Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as ISignUpResponse;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(signUpFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as ISignUpResponse;
    });
    builder.addCase(signUpFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(signUpFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as ISignUpResponse;
    });
  },
});

export const { resetData } = signUpSlice.actions;
