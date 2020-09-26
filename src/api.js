import { DEFAULTINTERCEPTORS } from './interceptors.js'

const validateUrl = (url) => {
    if (!url) {
        throw `url is required`
    }
}

const checkApplicationJson = (request, applicationJson) => {
    const { method, headers } = request;
    if (
        (method === "POST" || method === "PUT" || method === "PATCH")
        && applicationJson
    ) {
        headers.set('content-type', 'application/json')
    }
    return request;
}

const createRequest = (url, method, request) => {
    let applyApplicationJson = false;
    const { body } = (request = request || {});
    if (body && !(body instanceof FormData)  && typeof body === 'object') {
        request.body = JSON.stringify(body)
        applyApplicationJson = true;
    }
    return checkApplicationJson(
        new Request(url, { method: method, ...request }),
        applyApplicationJson
    )
}

const exec = async (url, method, request, interceptors) => {
    let response, status;
    const req = createRequest(url, method, request)
    try {
        response = await fetch(req)
        status = response.status;
    } catch (err) {
        throw err;
    }
    finally {
        if (status) {
            const _method = interceptors[req.method]
            if (_method) {
                const _interceptor = _method[status];
                if (_interceptor) {
                    return await _interceptor(req, response);
                }
            }
        }
    }
}


const get = async function (path, request) {
    validateUrl(path)
    const url = `${this.url}${path}`
    return await exec(url, "GET", request, this.interceptors);
}
const post = async function (path, request) {
    validateUrl(path)
    const url = `${this.url}${path}`
    return await exec(url, "POST", request, this.interceptors);
}
const put = async function (path, request) {
    validateUrl(path, 'path')
    const url = `${this.url}${path}`
    return await exec(url, "PUT", request, this.interceptors);
}
const patch = async function (path, request) {
    validateUrl(path, 'path')
    const url = `${this.url}${path}`
    return await exec(url, "PATH", request, this.interceptors);
}
const deletehttp = async function (path, request) {
    validateUrl(path, 'path')
    const url = `${this.url}${path}`
    return exec(url, "DELETE", request, this.interceptors);
}


export const api = (url, interceptors = null, useDefaultInterceptors = true) => {
    validateUrl(url, 'url')
    if (useDefaultInterceptors) {
        interceptors = { ...DEFAULTINTERCEPTORS, ...interceptors || {} }
    } else {
        interceptors = { ...interceptors || {} }
    }
    return {
        url,
        interceptors,
        get,
        post,
        put,
        patch,
        "delete": deletehttp
    }

}