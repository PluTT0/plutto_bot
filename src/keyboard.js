import * as kb from './keyboardButtons.js'

const homeKeyboard = [
    [kb.userKeboard.sertch, kb.userKeboard.create],
    [kb.userKeboard.edit],
];

const categotyKeyboard = [
    {
        text: kb.locations.club,
        callback_data:"click"
    },
    {
        text: kb.locations.restourant,
        callback_data:"click"
    },
    {
        text: kb.locations.pavilion,
        callback_data:"click"
    },
    //{
    //    text: kb.backButton.back,
    //    callback_data:"click"
    //}
]

export {
    homeKeyboard,
    categotyKeyboard,
}