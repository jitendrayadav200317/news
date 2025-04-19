import { removeCookie, setCookie, getCookie } from '../../utils/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { googleProvider, auth } from "../../config/firebase.js"; 
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'sonner';

const initialState = {
  loading: false,
  authenticated: getCookie('isAuthenticated') || false,
  name: getCookie('name') || null,
  id: getCookie('id') || null,
  preferences: JSON.parse(localStorage.getItem('preferences')) || [],
};

export const SignUp = createAsyncThunk(
  '/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  '/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      const verifyres = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        { withCredentials: true }
      );
      return { ...res.data, ...verifyres.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signInWithGoogle = createAsyncThunk('/google-login', async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider); // ✅ fixed
    const idToken = await result.user.getIdToken();

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      { idToken }
    );

    return res.data;
  } catch (err) {
    return rejectWithValue(err); // ✅ handled
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: function (state) {
      state.authenticated = false;
      state.id = null;
      state.name = null;
      removeCookie('isAuthenticated');
      removeCookie('name');
      removeCookie('id');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.loading = false;
        const msg = action.payload?.response?.data?.message || "Registration failed";
        toast.error(msg);
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;
        setCookie('isAuthenticated', action.payload.authenticated);
        setCookie('email', action.payload.email);
        setCookie('name', action.payload.name);
        setCookie('id', action.payload.id);
        state.preferences = action.payload.preferences;
        localStorage.setItem('preferences', JSON.stringify(action.payload.preferences));
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        const msg = action.payload?.response?.data?.message || "Login failed";
        toast.error(msg);
      })

      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;
        setCookie('isAuthenticated', action.payload.authenticated);
        setCookie('email', action.payload.email);
        setCookie('name', action.payload.name);
        setCookie('id', action.payload.id);
        state.preferences = action.payload.preferences;
        localStorage.setItem('preferences', JSON.stringify(action.payload.preferences));
        toast.success(action.payload.message);
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        const msg = action.payload?.response?.data?.message || "Google sign-in failed";
        toast.error(msg);
      });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;
