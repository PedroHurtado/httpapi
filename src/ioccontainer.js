//TODO estrategies singleton,value,factory,instance,etc...
import { validate } from './validate.js'

export const singleton = function (key, ...dependecies) {
    return () => { }
}
export const instance = function (key, ...dependecies) {
    return () => { }
}
export const value = function (key, ...dependecies) {
    return () => { }
}
export const factory = function (key, ...dependecies) {
    return () => { }
}
export class IocContainer {
    constructor() {
        this._dependencies = new Map();
        this._caches = new Map();
    }
    set(key, strategy) {
        validate(key, 'key is required');
        validate(strategy, 'strategy is required');
        this._dependencies.set(key, strategy)
    }
    get(key) {
        validate(key, 'key is required');
        const strategy = this._dependencies.get(key)
        if (!strategy) {
            validate(`${key} dependecies is not defined`)
        }
        return strategy.bind(this)();
    }
}