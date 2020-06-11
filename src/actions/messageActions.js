import {RSAA, getJSON} from 'redux-api-middleware';

export const START_MESSAGES_LOADING = 'START_MESSAGES_LOADING';
export const SUCCESS_MESSAGES_LOADING = 'SUCCESS_MESSAGES_LOADING';
export const ERROR_MESSAGES_LOADING = 'ERROR_MESSAGES_LOADING';

export const CHANGE_INPUT_TEXT = 'CHANGE_INPUT_TEXT';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const CONFIRM_EDIT_MESSAGE = 'CONFIRM_EDIT_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const updateDataSendMessage = (sender, senderText, chatId) => ({
    type: SEND_MESSAGE,
    sender, senderText, chatId
});

export const loadMessages = () => ({
    [RSAA]: {
        endpoint: '/api/messages.json',
        method: 'GET',
        types: [
            START_MESSAGES_LOADING,
            {
                type: SUCCESS_MESSAGES_LOADING,
                payload: (action, state, response) => getJSON(response).then(data => data)
            },
            ERROR_MESSAGES_LOADING
        ]
    }
});

export const removeMessage = (chatId, messageId) => ({
    type: REMOVE_MESSAGE,
    chatId, messageId
});

export const editMessage = (chatId, messageId, author, text) => ({
    type: EDIT_MESSAGE,
    chatId, messageId, author, text
});

export const updateDataEditMessage = (chatId, messageId, author, text) => ({
    type: CONFIRM_EDIT_MESSAGE,
    chatId, messageId, author, text
});

export const changeInputText = (text) => ({
    type: CHANGE_INPUT_TEXT,
    text
});