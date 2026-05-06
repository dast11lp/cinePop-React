import { createSlice } from "@reduxjs/toolkit";
import { loginFetch, registerFetch } from "../../services/authService";

const initialState = {
  userLogin: {},
};

// pasar a un helper lo siguiente

const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp es un timestamp, exp es el momento en el que vence el token ¿la fecha de expiración todavía está en el futuro?
    return payload.exp * 1000 > Date.now(); 
  } catch {
    return false;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userLogin = action.payload;
      localStorage.setItem("user", JSON.stringify(state.userLogin));
      localStorage.setItem("token", action.payload.Authorization);
    },
    setLogOut: (state) => {
      state.userLogin = {};
      localStorage.removeItem("user"), localStorage.removeItem("token");
    },
    getLogin: (state) => {
      const token = localStorage.getItem("token");

      if (!token || !isTokenValid(token)) {
        state.userLogin = {};
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      state.userLogin = { ...user, token };
    },
  },
});

export const login = (user, navigate, previousPage) => async (dispatch) => {
  try {
    const data = await loginFetch(user);
    dispatch(setLogin(data));

    if (previousPage) {
      navigate(-1);
    } else {
      navigate("/");
    }
  } catch (error) {
    throw error;
  }
};

export const registerFetchMiddleware = (body) => async (dispatch) => {
  try {
    const data = await registerFetch(body);
    console.log(data);
    dispatch;
  } catch (error) { }
};

export const { setLogin, setLogOut, getLogin } = authSlice.actions;

export default authSlice.reducer;
