import { createSlice } from "@reduxjs/toolkit";
import { RegisteredUserType, UserType } from "../../utils/types";

export const defaultState: {
  isLogin: boolean;
  registeredUsers: RegisteredUserType;
  user: UserType | null;
} = {
  isLogin: false,
  registeredUsers: [],
  user: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {
    login: (state, action: { payload: UserType }) => {
      return { ...state, user: action.payload, isLogin: true };
    },
    logout: (state) => {
      return { ...state, user: null, isLogin: false };
    },
    signup: (state: any, action: { payload: UserType }) => {
      debugger;
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
        user: action.payload,
        isLogin: true,
      };
    },
  },
});

export const { login, signup, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
