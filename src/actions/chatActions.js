export const ADD_CHAT = 'ADD_CHAT';
export const REMOVE_CHAT = 'REMOVE_CHAT';
export const START_CHATS_LOADING = 'START_CHATS_LOADING';
export const SUCCESS_CHATS_LOADING = 'SUCCESS_CHATS_LOADING';
export const ERROR_CHATS_LOADING = 'ERROR_CHATS_LOADING';
import {RSAA, getJSON} from 'redux-api-middleware';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const READ_UNREAD = 'READ_UNREAD';
export const MAKE_ACTIVE = 'MAKE_ACTIVE';
export const MAKE_NOT_ACTIVE = 'MAKE_NOT_ACTIVE';

export const addChat = () => ({
    type: ADD_CHAT
});

export const removeChat = (chat) => ({
    type: REMOVE_CHAT,
    chat
});

export const loadChats = () => ({
    [RSAA]: {
        endpoint: '/api/chats.json',
        method: 'GET',
        types: [
            START_CHATS_LOADING,
            {
                type: SUCCESS_CHATS_LOADING,
                payload: (action, state, response) => getJSON(response).then(data => data)
            },
            ERROR_CHATS_LOADING
        ]
    }
});

export const menuToggle = () => ({
    type: TOGGLE_MENU
});

export const readUnread = (chatId, actionFrom) => ({
    type: READ_UNREAD,
    chatId, actionFrom
});

export const makeActive = (chatId) => ({
    type: MAKE_ACTIVE,
    chatId
});

export const makeNotActive = (chatId) => ({
    type: MAKE_NOT_ACTIVE,
    chatId
});