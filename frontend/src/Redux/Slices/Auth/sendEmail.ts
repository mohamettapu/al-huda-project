import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {
  ISendEmailPayload,
  ISendEmailResponse,
} from "../../../types/ResetCodeInterfaces";

const loginData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as ISendEmailResponse);
const initialState = {
  data: loginData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const sendResetCodeFN = createAsyncThunk(
  "auth/Send/reset/code",
  async (data: ISendEmailPayload, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/user/reset-password/send-code", data);

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

export const sendResetCodeSlice = createSlice({
  name: "send reset code Slice",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.data = {} as ISendEmailPayload;
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isError = false;
    //   state.errorMsg = "";
    //   localStorage.removeItem("userInfo");
    // },
  },
  extraReducers(builder) {
    builder.addCase(sendResetCodeFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as ISendEmailResponse;
    });
    builder.addCase(sendResetCodeFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(sendResetCodeFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as ISendEmailResponse;
    });
  },
});

// export const { logout } = LoginSLice.actions;
