const logStart = () => {
    console.log("Bot has been started ...")
};

const debug = (obj = {}) => {
    return JSON.stringify(obj, null, 4)
};

const getChatId = (msg) => {
    return msg.chat.id
};

const checkBox = (selectedOptions, optionSelected) => {
    if (selectedOptions.includes(optionSelected)) {
        // if the option is already selected, remove the check mark
        const index = selectedOptions.indexOf(optionSelected);
        selectedOptions.splice(index, 1);
    } else {
        // if the option is not selected, add the check mark
        selectedOptions.push(optionSelected);
    }
};

export {
    logStart,
    debug,
    getChatId,
    checkBox,
}