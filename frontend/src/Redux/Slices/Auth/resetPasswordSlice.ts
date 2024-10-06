import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {
  IResetPasswordPayload,
  IResetPasswordResponse,
} from "../../../types/ResetCodeInterfaces";

const resetCodeData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as IResetPasswordResponse);
const initialState = {
  data: resetCodeData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const resetPasswordFN = createAsyncThunk(
  "auth/[password/reset",
  async (data: IResetPasswordPayload, { rejectWithValue }) => {
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

      const res = await apiClient.put("/user/reset-password/update", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

export const resetPasswordSLice = createSlice({
  name: "reset password",
  initialState,
  reducers: {
    resetData:(state)=>{

        state.data = {} as IResetPasswordResponse;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.errorMsg = "";
      }
  },
  extraReducers(builder) {
    builder.addCase(resetPasswordFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IResetPasswordResponse;
    });
    builder.addCase(resetPasswordFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;

      localStorage.removeItem("userInfo");
    });
    builder.addCase(resetPasswordFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IResetPasswordResponse;
    });
  },
});


export const { resetData } = resetPasswordSLice.actions;