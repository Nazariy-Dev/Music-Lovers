import $api from './interceptors';
import {AxiosResponse} from 'axios';
import {AuthResponseSuccess} from "../../models/user/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseSuccess>> {
        return $api.post<AuthResponseSuccess>('/login', {email, password})
    }

    static async registration(email: string, password: string, name: string): Promise<AxiosResponse<AuthResponseSuccess>> {
        return $api.post<AuthResponseSuccess>('/registration', {email, password, name})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}

