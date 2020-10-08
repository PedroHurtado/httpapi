import { DEFAULTINTERCEPTORS } from './interceptors.js'
import before, { DEFAULT_MIDDLEWARES } from './before.js'
import after from './after.js'
import {validate} from './validate.js'
 
const validateUrl = (url) => {
    validate(url,'url is required');
}


const createRequest = (url, method) => {
    return new Request(url, { method: method }),
}

const exec = async (url, method, options, middlewares, interceptors) => {
    let response
    const request = createRequest(url, method)
    try {
        response = await middlewares(req, options)
        return await after(request, response, interceptors)
    } catch (err) {
        throw err;
    }
}


const get = async function (url, options) {
    validateUrl(url)
    return await exec(url, "GET", options, this.middlewares, this.interceptors);
}
const post = async function (url, options) {
    validateUrl(url)
    return await exec(url, "POST", options, this.middlewares, this.interceptors);
}
const put = async function (url, options) {
    validateUrl(url)
    return await exec(url, "PUT", options, this.middlewares, this.interceptors);
}
const patch = async function (url, options) {
    validateUrl(url)
    return await exec(url, "PATH", options, this.middlewares, this.interceptors);
}
const deletehttp = async function (url, options) {
    validateUrl(url)
    return await exec(url, "DELETE", options, this.middlewares, this.interceptors);
}
const resolveUrl = function (path, query) {
    path = path || '';
    query = query || {};
    const url = new URL(path, this.url)
    Object.entries(query).forEach(params => {
        url.searchParams.append(params[0], encodeURIComponent(params[1]))
    })
    return url;
}


export const api = (url, middlewares, interceptors = null, useDefaultInterceptors = true) => {
    validateUrl(url, 'url')
    if (useDefaultInterceptors) {
        interceptors = { ...DEFAULTINTERCEPTORS, ...interceptors || {} }
    } else {
        interceptors = { ...interceptors || {} }
    }
    return {
        url,
        resolveUrl,
        middlewares: before(middlewares || DEFAULT_MIDDLEWARES),
        interceptors,
        get,
        post,
        put,
        patch,
        "delete": deletehttp
    }

}