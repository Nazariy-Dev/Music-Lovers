// import { AppDispatch } from "../store";
// import { userSlice } from "./UserSlice";
import AuthService from "../../utils/services/authService";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthLoginRequest, AuthSignUpRequest } from "../../models/user/AuthRequest";
import axios from "axios";
import { AuthResponseSuccess } from "../../models/user/AuthResponse";
import { IUser } from "../../models/user/IUser";


export const API_URL = `${import.meta.env.VITE_API_URL}/api`

export const login: AsyncThunk<IUser, AuthLoginRequest, any> = createAsyncThunk(
    'user/login',
    async ({ email, password }: AuthLoginRequest, thunkAPI) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user
        } catch (axiosError: any) {
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }
    }
)
export const signUp: AsyncThunk<IUser, AuthSignUpRequest, any> = createAsyncThunk(
    'user/signUp',
    async ({ email, password, name }: AuthSignUpRequest, thunkAPI) => {
        try {
            const response = await AuthService.registration(email, password, name);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user
        } catch (axiosError: any) {
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }
    }
)

export const checkAuth: AsyncThunk<IUser, void, any> = createAsyncThunk(
    'user/checkAuth',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponseSuccess>(`${API_URL}/refresh`, {
                withCredentials: true
            })
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user
        } catch (axiosError: any) {
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }
    }
)

export const logout: AsyncThunk<any, void, any> = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
        } catch (axiosError: any) {
            return thunkAPI.rejectWithValue(axiosError?.response?.data)
        }
    }
)