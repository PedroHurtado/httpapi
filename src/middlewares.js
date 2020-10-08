import { Unauthorized } from './customerrors.js'

export class LanguageMiddleware {
    static async canActivate(req, res, options) {
        return options.language;
    }
    static async exec(req, res, next, options) {
        const provide = options.language;
        req.headers.append('accept-language', await provide.get())
        next();
    }
}

export class JsonMiddleware {
    static async canActivate(req, res, options) {
        return options.json;
    }
    static async exec(req, res, next, options) {
        req.headers.append('content-type', 'application/json')
        req.body = JSON.stringify(options.json)
        next();
    }
}

export class FormDataMiddleware {
    static async canActivate(req, res, options) {
        return options.formdata;
    }
    static async exec(req, res, next, options) {
        req.body = options.formdata;
        next();
    }
}

export class AuthorizationMiddleware {
    static async canActivate(req, res, options) {
        return options.Authorization;
    }
    static async exec(req, res, next, options) {
        const provide = options.Authorization;
        const token = await provide.getToken();
        if (!token) {
            throw new Unauthorized();
        }
        req.headers.append('Authorization', `Bearer ${token}`)
        next();
    }
}
export class RunMiddleware {
    static async canActivate(req, res, options) {
        return true;
    }
    static async exec(req, res, next, options) {
        next(await fetch(req));
    }
}

export class ReadCacheMiddleware {
    static async canActivate(req, res, options) {
        return options.cache;
    }
    static async exec(req, res, next, options) {
        const provider = options.cache;
        const response = await provide.match(req);
        if (response) {
            return response;
        }
        next();
    }
}
export class WriteCacheMiddleware {
    static async canActivate(req, res, options) {
        return options.cache;
    }
    static async exec(req, res, next, options) {
        const provide = options.cache:
        await provide.put(req, res);
        return res;
    }
}


export const DEFAULT_MIDDLEWARES = new Set([
    new middlewares.LanguageMiddleware,
    new middlewares.AuthorizationMiddleware,
    new middlewares.FormDataMiddleware,
    new middlewares.JsonMiddleware,
    new middlewares.ReadCacheMiddleware,
    new middlewares.RunMiddleware,
    new middlewares.WriteCacheMiddleware
])