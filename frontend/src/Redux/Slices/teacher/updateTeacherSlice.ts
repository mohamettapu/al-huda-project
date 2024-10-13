import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {} from "../../../types/ResetCodeInterfaces";
import {
  IUpdateTeacherPayload,
  IUpdateTeacherResponse,
} from "../../../types/TeacherInterfaces";

const resetCodeData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as IUpdateTeacherResponse);
const initialState = {
  data: resetCodeData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const UpdateTeacherFN = createAsyncThunk(
  "update/teacher",
  async (data: IUpdateTeacherPayload, { rejectWithValue }) => {
    try {
      const userInfoString = localStorage.getItem("userInfo");
      if (!userInfoString) {
        return rejectWithValue("No user info available");
      }
      const userInfo = JSON.parse(userInfoString);
      const token = userInfo.accessToken;
      if (!token) {
        return rejectWithValue("No access token");
      }

      const res = await apiClient.put("/teacher/update", data, {
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

export const updateTeacherSlice = createSlice({
  name: "update/teacher Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as IUpdateTeacherResponse;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(UpdateTeacherFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IUpdateTeacherResponse;
    });
    builder.addCase(UpdateTeacherFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(UpdateTeacherFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IUpdateTeacherResponse;
    });
  },
});

export const { resetData } = updateTeacherSlice.actions;
