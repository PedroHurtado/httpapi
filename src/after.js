import {validate} from './validate.js'
export default after = async (request, response, interceptors) => {
    validate(request, 'request is required');
    validate(response, 'response is required');
    validate(interceptors, 'interceptors is required');

    const { method, status } = response;

    const methodinterceptors = interceptors[method];
    validate(methodinterceptors, `${method} not defined in interceptors`)
    
    const interceptor = interceptors[methodinterceptors];
    validate(interceptor, `status code:${status} not defined in interceptor ${method}`)
    return await interceptor(request, response)
}