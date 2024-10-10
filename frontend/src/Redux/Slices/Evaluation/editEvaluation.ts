import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";

import {
  IUpdateEvaluationResponse,
  IUpdateEvaluationPayload,
} from "../../../types/evaluationInterfaces";

const loginData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : ({} as IUpdateEvaluationResponse);
const initialState = {
  data: loginData,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const editEvaluationFN = createAsyncThunk(
  "Update/Evaluation",
  async (data: IUpdateEvaluationPayload, { rejectWithValue }) => {
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

      const res = await apiClient.put("/Evaluation/update-evaluation", data, {
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

export const editEvaluationSlice = createSlice({
  name: "update Evaluations Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as IUpdateEvaluationResponse;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(editEvaluationFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IUpdateEvaluationResponse;
    });
    builder.addCase(editEvaluationFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(editEvaluationFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IUpdateEvaluationResponse;
    });
  },
});

export const { resetData } = editEvaluationSlice.actions;
