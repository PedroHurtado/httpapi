import {
    NotFound,
    BadRequest,
    Unauthorized,
    ForBiden,
    NotAllowed,
    ServerError
} from './customerrors.js'

const OK = async (req, res) => await res.json();
const NOCONTENT = async (req,res)=>'';
const NOTFOUND = async (req, res) => {throw new NotFound(res.statusText);}
const BADREQUEST = async (req, res) => {
    const data = await res.json()
    throw new BadRequest(data,res.statusText)
};
const UNAUTHORIZED = async (req, res) => {throw new Unauthorized(res.statusText);}
const FORBIDEN = async (req, res) => {throw new ForBiden(res.statusText);}
const NOTALLOWED = async (req, res) => {throw new NotAllowed(res.statusText);}
const SERVERERROR = async (req, res) => {
    const data = await res.json()
    throw new ServerError(data,res.statusText);
};

const GLOBALERRORS = {
    "400": BADREQUEST,
    "401": UNAUTHORIZED,
    "403": FORBIDEN,
    "405": NOTALLOWED,
    "500": SERVERERROR
}
export const DEFAULTINTERCEPTORS = {
    "GET": {
        "200" :OK,
        "404": NOTFOUND,
        ...GLOBALERRORS
    },
    "POST": {
        "201": OK,
        ...GLOBALERRORS
    },
    "PUT": {
        "200": OK,
        "204":NOCONTENT,
        "404": NOTFOUND,
        ...GLOBALERRORS
    },
    "PATCH": {
        "200": OK,
        "204":NOCONTENT,
        "404": NOTFOUND,
        ...GLOBALERRORS
    },
    "DELETE": {
        "200": OK,
        "204":NOCONTENT,
        "404": NOTFOUND,
        ...GLOBALERRORS
    }
}