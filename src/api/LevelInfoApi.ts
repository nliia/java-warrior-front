import AxiosWrapper, {AxiosRequestConfig} from "./AxiosWrapper";

export default class LevelInfoApi extends AxiosWrapper {

    static async getStage(token: string) {
        return (await this.get<{}, Stage>("/level", {headers: {'Authorization': token}})).data
    }


}

export interface Stage {
    cells: StageCell[],
    number: number,
    description: string
}

export interface CellContent {
    health: number,
    damage: number,
    contentType: ContentType
}

export interface StageCell {
    content: CellContent
}

export type ContentType = "ENEMY" | "SPIKE" | "EMPTY" | "HERO"


