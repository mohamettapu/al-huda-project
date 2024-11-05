import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {
  UpdateRoleInterface,
  updateRoleResponse,
} from "../../../types/userInterface";

const loginData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as updateRoleResponse);
const initialState = {
  data: loginData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const updateRoleFN = createAsyncThunk(
  "Update/role",
  async (data: UpdateRoleInterface, { rejectWithValue }) => {
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

      const res = await apiClient.put("/user/change-role", data, {
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

export const updateRoleSLice = createSlice({
  name: "update role Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as updateRoleResponse;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(updateRoleFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as updateRoleResponse;
    });
    builder.addCase(updateRoleFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(updateRoleFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as updateRoleResponse;
    });
  },
});

export const { resetData } = updateRoleSLice.actions;
