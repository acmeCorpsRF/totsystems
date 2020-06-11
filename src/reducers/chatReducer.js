import update from 'react-addons-update';
import {
    START_MESSAGES_LOADING,
    SUCCESS_MESSAGES_LOADING,
    ERROR_MESSAGES_LOADING,
    CHANGE_INPUT_TEXT,
    SEND_MESSAGE,
    EDIT_MESSAGE,
    CONFIRM_EDIT_MESSAGE,
    REMOVE_MESSAGE
} from '../actions/messageActions';
import {
    START_CHATS_LOADING,
    SUCCESS_CHATS_LOADING,
    ERROR_CHATS_LOADING,
    ADD_CHAT,
    REMOVE_CHAT,
    TOGGLE_MENU,
    READ_UNREAD,
    MAKE_ACTIVE,
    MAKE_NOT_ACTIVE
} from '../actions/chatActions';

const initialStore = {
    messages: {},
    chats: {},
    isLoadingChats: false,
    isLoadingMessages: false,
    isVisibility: false,
    firstDataLoadChats: false,
    firstDataLoadMessages: false,
    hiddenEditButton: true,
    textEditMessage: {},
    inputText: ''
};

export default function chatReducer(store = initialStore, action) {
    switch (action.type) {
        case START_CHATS_LOADING: {
            return update(store, {
                isLoadingChats: {$set: true}
            });
        }
        case SUCCESS_CHATS_LOADING: {
            const downloadableChats = {};
            Object.keys(action.payload).map(chatKey => {
                const {title, messageList, link, unread, active} = action.payload[chatKey];
                downloadableChats[chatKey] = {title, messageList, link, unread, active};
            });
            return update(store, {
                chats: {$set: downloadableChats},
                isLoadingChats: {$set: false},
                firstDataLoadChats: {$set: true}
            });
        }
        case ERROR_CHATS_LOADING: {
            return update(store, {
                isLoadingChats: {$set: false}
            });
        }
        case START_MESSAGES_LOADING: {
            return update(store, {
                isLoadingMessages: {$set: true},
            });
        }
        case SUCCESS_MESSAGES_LOADING: {
            const downloadableMessages = {};
            Object.keys(action.payload).map(messageKey => {
                const {author, text, chatId} = action.payload[messageKey];
                downloadableMessages[messageKey] = {author, text, chatId};
            });
            return update(store, {
                messages: {$set: downloadableMessages},
                isLoadingMessages: {$set: false},
                firstDataLoadMessages: {$set: true}
            });
        }
        case ERROR_MESSAGES_LOADING: {
            return update(store, {
                isLoadingMessages: {$set: false},
            });
        }
        case CHANGE_INPUT_TEXT: {
            return update(store, {
                inputText: {$set: action.text}
            });
        }
        case SEND_MESSAGE: {
            if (Object.keys(store.messages).length === 0) {
                const messageId = 1;
                return update(store, {
                    chats: {
                        $merge: {
                            ...store.chats,
                            [action.chatId]: {
                                title: store.chats[action.chatId].title,
                                messageList: [...store.chats[action.chatId].messageList, messageId],
                                link: store.chats[action.chatId].link,
                                unread: store.chats[action.chatId].unread,
                                active: store.chats[action.chatId].active
                            }
                        }
                    },
                    messages: {
                        $merge: {
                            ...store.messages,
                            [messageId]: {author: action.sender, text: action.senderText, focused: false}
                        }
                    },
                    inputText: {$set: ''}
                });
            }
            const sender = (action.sender !== 'robot') ? action.sender : 'robot';
            let dictionary;
            Object.keys(store.messages).map(messageId => {
                if ((store.chats[action.chatId].messageList[store.chats[action.chatId].messageList.length - 1]) == messageId) {
                    dictionary = store.messages[messageId];
                }
            });
            if (store.chats[action.chatId].messageList.length !== 0) {
                if (((dictionary.author === 'robot') && action.sender == 'robot')
                    || action.sender !== sender) {
                    return store;
                }
            }
            const messageId = Number(Object.keys(store.messages)[(Object.keys(store.messages)).length - 1]) + 1;
            return update(store, {
                chats: {
                    $merge: {
                        ...store.chats,
                        [action.chatId]: {
                            title: store.chats[action.chatId].title,
                            messageList: [...store.chats[action.chatId].messageList, messageId],
                            link: store.chats[action.chatId].link,
                            unread: store.chats[action.chatId].unread,
                            active: store.chats[action.chatId].active
                        }
                    }
                },
                messages: {
                    $merge: {
                        ...store.messages, [messageId]: {author: action.sender, text: action.senderText, focused: false}
                    }
                },
                inputText: {$set: ''}
            });
        }
        case EDIT_MESSAGE: {
            Object.keys(store.messages).map(messageId => {
                store.messages[messageId].focused = false;
            });
            return update(store, {
                hiddenEditButton: {$set: false},
                textEditMessage: {
                    $set: {
                        chatId: action.chatId,
                        messageId: action.messageId,
                        author: action.author,
                        text: action.text
                    }
                },
                messages: {
                    $merge: {
                        ...store.messages, [action.messageId]: {author: action.author, text: action.text, focused: true}
                    }
                },
                inputText: {$set: action.text}
            });
        }
        case CONFIRM_EDIT_MESSAGE: {
            return update(store, {
                hiddenEditButton: {$set: true},
                messages: {
                    $merge: {
                        ...store.messages,
                        [action.messageId]: {author: action.author, text: action.text, focused: false}
                    }
                },
                textEditMessage: {
                    $set: {}
                },
                inputText: {$set: ''}
            });
        }
        case REMOVE_MESSAGE: {
            const newMessagesStore = () => {
                store.chats[action.chatId].messageList.map(mId => {
                    if (mId == action.messageId) {
                        delete store.messages[action.messageId];
                    }
                });
                return store.messages;
            };
            const newChatStore = () => {
                const filteredList = store.chats[action.chatId].messageList.filter(mId => mId !== action.messageId);
                store.chats[action.chatId].messageList = filteredList;
                return store.chats;
            };
            return update(store, {
                chats: {
                    $merge: newChatStore()
                },
                messages: {
                    $merge: newMessagesStore()
                }
            });
        }
        case ADD_CHAT: {
            const newChatId = (Object.keys(store.chats)).length ? Number(Object.keys(store.chats)[(Object.keys(store.chats)).length - 1]) + 1 : 1;
            const messageId = (Object.keys(store.messages)).length ? Number(Object.keys(store.messages)[(Object.keys(store.messages)).length - 1]) + 1 : 1;
            return update(store, {
                messages: {
                    $merge: {
                        ...store.messages, [messageId]: {author: 'robot', text: `Это чат №${newChatId}.`}
                    }
                },
                chats: {
                    $merge: {
                        ...store.chats,
                        [newChatId]: {
                            title: 'Chat ' + newChatId,
                            messageList: [messageId],
                            link: '/chat/' + newChatId,
                            unread: true
                        }
                    }
                }
            });

        }
        case REMOVE_CHAT: {
            const newMessagesStore = () => {
                store.chats[action.chat.link.slice(6)].messageList.map(messageId => {
                    delete store.messages[messageId];
                });
                return store.messages;
            };
            const newChatStore = () => {
                delete store.chats[action.chat.link.slice(6)];
                return store.chats;
            };
            return update(store, {
                messages: {
                    $merge: newMessagesStore()
                },
                chats: {
                    $merge: newChatStore()
                }
            });
        }
        case TOGGLE_MENU: {
            let toggle;
            store.isVisibility == false ? toggle = true : toggle = false;
            return update(store, {
                isVisibility: {$set: toggle}
            });
        }
        case READ_UNREAD: {
            let readingStatus;
            if (action.actionFrom == 'SEND_MESSAGE'
                && store.chats[action.chatId].unread == false
                && store.chats[action.chatId].active == false) {
                readingStatus = true;
            } else {
                readingStatus = store.chats[action.chatId].unread;
            }
            if (action.actionFrom == 'SET_LOCATION') {
                readingStatus = false;
            }
            return update(store, {
                chats: {
                    $merge: {
                        ...store.chats,
                        [action.chatId]: {
                            title: store.chats[action.chatId].title,
                            messageList: store.chats[action.chatId].messageList,
                            link: store.chats[action.chatId].link,
                            unread: readingStatus,
                            active: store.chats[action.chatId].active
                        }
                    }
                }
            });
        }
        case MAKE_ACTIVE: {
            return update(store, {
                chats: {
                    $merge: {
                        ...store.chats,
                        [action.chatId]: {
                            title: store.chats[action.chatId].title,
                            messageList: store.chats[action.chatId].messageList,
                            link: store.chats[action.chatId].link,
                            unread: store.chats[action.chatId].unread,
                            active: true
                        }
                    }
                },
            });
        }
        case MAKE_NOT_ACTIVE: {
            return update(store, {
                chats: {
                    $merge: {
                        ...store.chats,
                        [action.chatId]: {
                            title: store.chats[action.chatId].title,
                            messageList: store.chats[action.chatId].messageList,
                            link: store.chats[action.chatId].link,
                            unread: store.chats[action.chatId].unread,
                            active: false
                        }
                    }
                },
            });
        }
        default:
            return store;
    }
}
