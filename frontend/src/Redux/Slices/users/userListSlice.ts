import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";
// import { IListTeacherResult } from "../../../types/TeacherInterfaces";
import { IUserListResult } from "../../../types/userInterface";

const initialState = {
  data: {} as IUserListResult,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const userListFN = createAsyncThunk(
  "List/users",
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

      const res = await apiClient.get("/user/list-user", {
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

export const userListSlace = createSlice({
  name: "users list Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as IUserListResult;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(userListFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IUserListResult;
    });
    builder.addCase(userListFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(userListFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IUserListResult;
    });
  },
});

export const { resetData } = userListSlace.actions;
