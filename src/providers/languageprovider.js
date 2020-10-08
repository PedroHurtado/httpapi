import cultureprovider from './cultureprovider'

export class LanguageProvider {
     constructor(cultureprovider){
        this.cultureprovider = cultureprovider;
     }
     async get(){
        return await this.cultureprovider.culture;
     }
}
export default new LanguageProvider(cultureprovider);