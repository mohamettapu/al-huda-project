import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { default_error_message } from "../../../constants";
import apiClient from "../../../services/axiosConfing";
import { IListEvaluations } from "../../../types/evaluationInterfaces";

const initialState = {
  data: {} as IListEvaluations,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const listEvaluationFN = createAsyncThunk(
  "List/Evaluation",
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

      const res = await apiClient.get("/Evaluation/list-evaluations", {
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

export const listEvaluationSlice = createSlice({
  name: "fetching Evaluations Slice",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = {} as IListEvaluations;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(listEvaluationFN.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMsg = "";
      state.isSuccess = false;
      state.data = {} as IListEvaluations;
    });
    builder.addCase(listEvaluationFN.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMsg = "";
      state.data = action.payload;
    });
    builder.addCase(listEvaluationFN.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = String(action.payload);
      state.data = {} as IListEvaluations;
    });
  },
});

export const { resetData } = listEvaluationSlice.actions;
