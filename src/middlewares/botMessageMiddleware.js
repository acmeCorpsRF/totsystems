import {SEND_MESSAGE, updateDataSendMessage} from '../actions/messageActions';
import {readUnread} from '../actions/chatActions';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            if (action.sender !== 'robot') {
                const {user} = store.getState().profileReducer;
                setTimeout(() => store.dispatch(
                    updateDataSendMessage('robot', `Dear ${user}, Я робот!`, action.chatId)
                ), 1000);
                setTimeout(() => store.dispatch(
                    readUnread(action.chatId, action.type)
                ), 1000);
            }
    }
    return next(action);
}

