import * idb from 'idb-keyval'
import userprovider from './userprovider'
const suportcultures = ['es','en']
const defaultculture = 'en'
const key="culture"
export class CultureProvider{
    constructor(idb,userprovider,languages){
        this._idb = idb;
        this._userprovider=userprovider;
        this._languajes = languages;
        this._culture = null;
    }
    async add(culture){
        await this._idb.set(key,culture);
        this._culture = null;
    }
    async get culture(){
        if(!this._culture){
            this._culture  = await this.get();
        }
        return this._culture;
    }
    _getDefaultCulture(){
        for(let i=0;i<languages.length){
            let language=languages[i];
            if(suportcultures.includes(language)){
                return language;
            }
        }
        return defaultculture;
    }
    async get(){
        let culture = await this._idb(key);
        if(!culture){
            const user = await this._userprovider.get();
            if(user){
                culture = user.culture;
            }else{
                culture = this._getDefaultCulture();
            }
            await this.add(culture);
        }
        return culture;
    }
}

export default new CultureProvider(idb,userprovider,navigator.languages)