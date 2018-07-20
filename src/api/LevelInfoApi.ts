import AxiosWrapper from "./AxiosWrapper";

export default class LevelInfoApi extends AxiosWrapper {

    static async getStage(level: number) {
        return (await this.get("/level/" + level)).data
    }
}
