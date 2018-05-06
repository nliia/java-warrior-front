import LoadingController from './LoadingController'

export default function Loading (name: string, title: string = 'Загрузка') {
    return function (target: any, prop: string, value: any) {

        return {
            value: async function (...args: any[]) {
                this.props.loadingsActions.set(name, true, title)
                var result = await value.value.apply(this, args)
                this.props.loadingsActions.set(name, false, title)                
                return result
            }
        };
    }
}