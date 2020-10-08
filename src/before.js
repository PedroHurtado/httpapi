import {DEFAULT_MIDDLEWARES} from './middlewares.js'


export default before = (middlewares = DEFAULT_MIDDLEWARES) => {
    return async (req, options) => {
        let _continue = false;
        let res = null;
        const next = (response) => {
            res = response;
            _continue = true;
        };
        for (let middleware of middlewares) {
            _continue = false;
            if (!(await middleware.canActivate(req, res, options))) {
                continue;
            }
            res = await middleware(req, res, next, options);
            if (!_continue) {
                break;
            }
        }
        return res;
    }
}
