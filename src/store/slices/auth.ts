import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type UserRole = "admin" | "librarian" | "reader";

interface authState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    role: UserRole;
  } | null;
}

const initialState: authState = {
  isAuthenticated: false,
  user: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        role: UserRole;
      }>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
