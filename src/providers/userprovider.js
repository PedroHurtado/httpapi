import * as idb from 'idb-keyval'
const KEY = 'USER'
export class UserProvider{
    constructor(idb){
        this._idb = idb;
    }
    async add(user){
        await this._idb.set(KEY,user)
    }
    async get(){
        return await this._idb.get(KEY)
    }
    async remove(){
        await this._idb.del(KEY)
    }
}
export default new UserProvider(idb);