//TODO estrategies singleton,value,factory,etc...
import {validate} from './validate.js'
export class IocContainer{
    constructor(){
        this._dependencies = new Map();
    }
    set(key,strategy){
        this._dependencies.set(key,strategy)
    }
    get(key){
        const strategy = this._dependencies.get(strategy)
        if(!strategy){
            validate(`${key} dependecies is not defined`)
        }
        return strategy();
    }
}