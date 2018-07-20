import AxiosWrapper from "./AxiosWrapper";

export default class AuthApi extends AxiosWrapper {

    static async auth(login: string, password: string) {
        return (await this.post<{ login: string, password: string }, UserInfo>("/sign_in", {
            login: login,
            password: password
        })).data
    }


}

export class UserInfo {
    email: string
    level: number
    token: string

    constructor() {
        this.email = ''
        this.level = 0
        this.token = ''
    }
}