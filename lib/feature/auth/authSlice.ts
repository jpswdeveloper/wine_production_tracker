import { destroySession } from "@/app/utils/session";
import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user?: Partial<User> | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      const { createdAt, ...otherUserInfo } = action.payload
        .user as unknown as User;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = {
        ...otherUserInfo
      };
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("userToken");
    }
  }
});
export const { setAuth, logOut } = authSlice.actions;

export default authSlice.reducer;
