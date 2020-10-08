export const validate = (obj, msg)=>{
    if (!obj) {
        throw new Error(msg)
    }
}