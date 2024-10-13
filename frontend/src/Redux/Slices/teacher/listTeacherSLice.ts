import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";
import { IListTeacherResult } from "../../../types/TeacherInterfaces";

const initialState = {
  data: {} as IListTeacherResult,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const listTeacherFN = createAsyncThunk(
  "List/Teachers",
  async (_, { rejectWithValue }) => {
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

      const res = await apiClient.get("/teacher/list", {
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

export const listTeacherSlice = createSlice({
  name: "fetching teachers list Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as IListTeacherResult;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(listTeacherFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IListTeacherResult;
    });
    builder.addCase(listTeacherFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(listTeacherFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IListTeacherResult;
    });
  },
});

export const { resetData } = listTeacherSlice.actions;
