const key = "api"
//TODO:cachestrategies
export class CacheProviders {
    constructor(key,cacheProvider){
        this._key = key;
        this._cacheProvider = cacheProvider;
        this._cache = null;
    }
    get async cache(){
        if(!this._cache){
            this._cache = await this._cacheProvider.open(this._key);
        }
        return this._cache;
    }  
    async put(request,response){
        await this.cache.put(request.clone(),response.clone());
    }
    async match(request){
        return await this.cache.match(request);
    }
}
export default new CacheProviders(key,caches)