import AxiosWrapper from "./AxiosWrapper";

export default class AuthApi extends AxiosWrapper {

    static async auth(login: string, password: string) {
        return (await this.post<{ login: string, password: string }, UserInfo>("/sign_in", {
            login: login,
            password: password
        })).data
    }

    static async signUp(login: string, password: string) {
        return (await this.post<{ login: string, password: string }, UserInfo>("/sign_up", {
            login: login,
            password: password
        })).data
    }


}

export class UserInfo {
    login: string
    level: number
    token: string

    constructor() {
        this.login = ''
        this.level = 0
        this.token = ''
    }
}