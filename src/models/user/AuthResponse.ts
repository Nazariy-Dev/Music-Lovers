import {IUser} from "./IUser";

export interface AuthResponseSuccess {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface AuthResponseError {
    errors: Array<any>
    message: string
}
