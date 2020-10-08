//TODO estrategies singleton,value,factory,instance,etc...
import { validate } from './validate.js'

export singleton = function (...dependecies) {
    return () => { }
}

export instance = function (...dependecies) {
    return () => { }
}
export value = function (...dependecies) {
    return () => { }
}
export factory = function(...dependecies){
    return ()=>{}
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