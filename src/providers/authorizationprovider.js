import userprovider from './userprovider'
import userservice from '../services/userservice'
export class AuthorizationProvider {
    constructor(userprovider,userservice){
        this._userprovider = userprovider;
        this._userservice = userservice
    }
    async _isValid(expiresIn){
        return Math.floor(Date.now() / 1000) < expiresIn;
    }
    async getToken(){
        let user = await this._userprovider.get()
        if (user){
            let {token,refresh_token,expiresIn} = user;
            if(!this._isValid(expiresIn){
                token = await this._userservice.refreshToken(refresh_token)
            }
            return token;
        }
    }
}

export default new AuthorizationProvider(userprovider,userservice);