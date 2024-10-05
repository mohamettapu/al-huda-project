import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {
  IcheckResetCodePayload,
  IcheckResetCodeResponse,
} from "../../../types/ResetCodeInterfaces";

const resetCodeData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as IcheckResetCodeResponse);
const initialState = {
  data: resetCodeData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const checkResetCodeFN = createAsyncThunk(
  "auth/check/reset/code",
  async (data: IcheckResetCodePayload, { rejectWithValue }) => {
    try {
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) {
        return rejectWithValue("No user info available");
      }
      const userInfo = JSON.parse(userInfoString);
      const token = userInfo.token;
      if (!token) {
        return rejectWithValue("No access token");
      }

      const res = await apiClient.post(
        "/user/reset-password/check-code",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

export const checkResetCodeSlice = createSlice({
  name: "check/code Slice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(checkResetCodeFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IcheckResetCodeResponse;
    });
    builder.addCase(checkResetCodeFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(checkResetCodeFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IcheckResetCodeResponse;
    });
  },
});

// export const { logout } = LoginSLice.actions;
