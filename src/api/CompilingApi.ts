import AxiosWrapper from "./AxiosWrapper";

export default class CompilingApi extends AxiosWrapper {

    static async compile (code: string) {
        return (await this.post<{ inputtedCode: string }, CompileResponse>("/compile", {
            inputtedCode: code
        })).data
    }

}

export type ActionType = "MOVE_FORWARD" | "SHOOT" | "FLIP_FORWARD" | "DEATH"

export interface Action {
    actionEnum: ActionType,
    damaged: number
    heroHp: number
}

export class CompileResponse {
    actions: Action[]
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