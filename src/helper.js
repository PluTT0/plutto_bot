const logStart = () => {
    console.log("Bot has been started ...")
};

const debug = (obj = {}) => {
    return JSON.stringify(obj, null, 4)
};

const getChatId = (msg) => {
    return msg.chat.id
};

export {
    logStart,
    debug,
    getChatId,
}