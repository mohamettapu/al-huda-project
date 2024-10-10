import { configureStore } from "@reduxjs/toolkit";
import { LoginSLice } from "./Slices/Auth/loginSLice";
import { sendResetCodeSlice } from "./Slices/Auth/sendEmail";
import { checkResetCodeSlice } from "./Slices/Auth/checkResetCode";
import { resetPasswordSLice } from "./Slices/Auth/resetPasswordSlice";
import { signUpSlice } from "./Slices/Auth/signUpSlice";
import { EvaluationSlice } from "./Slices/Evaluation/createEvaluationSLice";
import { listEvaluationSlice } from "./Slices/Evaluation/ListEvaluation";
import { editEvaluationSlice } from "./Slices/Evaluation/editEvaluation";
// import { EvaluationSlice } from "./Slices/Evaluation/createEvaluationSLice";

export const store = configureStore({
  reducer: {
    login: LoginSLice.reducer,
    sendEmail: sendResetCodeSlice.reducer,
    checkResetCode: checkResetCodeSlice.reducer,
    resetPasswordState: resetPasswordSLice.reducer,
    SingUpState: signUpSlice.reducer,

    // evaluations
    EvaluationSlice: EvaluationSlice.reducer,
    listEvaluations: listEvaluationSlice.reducer,
    editEvaluationSlice: editEvaluationSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
