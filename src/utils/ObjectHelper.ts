import * as _ from 'lodash'

export function excludeKeys (object: any, ...keys: string[]) {
    return _.pick(object, Object.keys(object).filter(key => !keys.includes(key)))
}