const debug = (obj = {}) => {
    return JSON.stringify(obj, null, 4)
}

export default debug;