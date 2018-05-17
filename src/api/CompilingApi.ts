import AxiosWrapper from "./AxiosWrapper";
import {ActionType} from "../react/components/abstract/Map";


export default class CompilingApi extends AxiosWrapper {

    static async compile (code: string) {
        return (await this.post<{ inputtedCode: string }, CompileResponse>("/compile", {
            inputtedCode: code
        })).data
    }

}

export class CompileResponse {
    actions: ActionType[]
    errorDescription: string
    message: string
    stageCompleted: boolean

    constructor () {
        this.actions = []
        this.message = ""
        this.errorDescription = ""
        this.stageCompleted = false
    }
}