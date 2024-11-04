import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {} from "../../../types/ResetCodeInterfaces";
import {
  ICreateTeacherPayload,
  ICreateTeacherResponse,
} from "../../../types/TeacherInterfaces";

const resetCodeData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as ICreateTeacherResponse);
const initialState = {
  data: resetCodeData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const createTeacherFN = createAsyncThunk(
  "create/teacher",
  async (data: ICreateTeacherPayload, { rejectWithValue }) => {
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

      const res = await apiClient.post("/teacher/create", data, {
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

export const createTeacherSlice = createSlice({
  name: "create/teacher Slice",
  initialState,
  reducers: {
    resetCreateTeacherData: (state) => {
      state.data = {} as ICreateTeacherResponse;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(createTeacherFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as ICreateTeacherResponse;
    });
    builder.addCase(createTeacherFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(createTeacherFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as ICreateTeacherResponse;
    });
  },
});

export const { resetCreateTeacherData } = createTeacherSlice.actions;
