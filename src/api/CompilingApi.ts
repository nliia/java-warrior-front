import AxiosWrapper from "./AxiosWrapper";

export default class CompilingApi extends AxiosWrapper {

    static async compile(code: string) {
        return (await this.post<{ inputtedCode: string }, CompileResponse>("/compile", {
            inputtedCode: code
        })).data
    }
}

export type ActionType =
    "MOVE_FORWARD"
    | "SHOOT"
    | "FLIP_FORWARD"
    | "FLIP_FORWARD_REJECTED"
    | "DEATH"
    | "STATIC"
    | "MOVE_FORWARD_REJECTED"
    | "TAKING_DAMAGE"

export interface Action {
    actionEnum: ActionType,
    damaged: number
    heroHp: number
    enemyDamage: number
}


export class CompileResponse {
    actions: Action[]
    errorDescription: string
    message: string
    stageCompleted: boolean

    constructor() {
        this.actions = []
        this.message = ""
        this.errorDescription = ""
        this.stageCompleted = undefined
    }
}