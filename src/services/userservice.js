import userprovider from '../providers/userprovider'
export class UserService{
    constructor(userprovider){
        this._userprovider = userprovider;
    }
    async refreshToken(refresh_token){
        //TODO:refresh token
        //await this._userprovider.add()
    }
}

export default new UserService(userprovider);