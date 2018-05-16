import AxiosWrapper from "./AxiosWrapper";


export default class CompilingApi extends AxiosWrapper {

    static async compile (code: string) {
        return await this.post<{ inputtedCode: string }, CompileResponse>("/compile", {
            inputtedCode: code
        })
    }

}

export interface CompileResponse {
    actions: string[]
    errorDescription: string
    message: string
    stageCompleted: boolean
}