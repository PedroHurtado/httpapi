const Mixin = Base => class extends Base{
    constructor(name,code,...params){
        super(...params)
        if(Error.captureStackTrace){
            Error.captureStackTrace(this,NotFound)
        }
        this.name = name;
        this.code = code;
        this.date = Date.now();
    }
}

export class NotFound extends Mixin(Error){
    constructor(...params){
        super("NotFound", 404,...params);
    }
}

export class BadRequest extends Mixin(Error){
    constructor(data,...params){
        super("BadRequest",400,...params);
        this.data = data;
    }
}

export class Unauthorized extends Error{
    constructor(...params){
        super("Unauthorized",401,...params)
    }
}

export class ForBiden extends Error{
    constructor(...params){
        super("ForBiden",403,...params)
    }
}

export class NotAllowed extends Error{
    constructor(...params){
        super("NotAllowed",405,...params)
    }
}

export class ServerError extends Error{
    constructor(data,...params){
        super("ServerError",500,...params)
        this.data = data;
    }
}