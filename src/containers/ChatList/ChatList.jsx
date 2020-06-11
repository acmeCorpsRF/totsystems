import React, {Component} from 'react';
import './ChatList.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {push} from 'connected-react-router';
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeChat, loadChats, readUnread, makeActive, makeNotActive} from '../../actions/chatActions';
import CircularProgress from '@material-ui/core/CircularProgress';

class ChatList extends Component {

    static propTypes = {
        chats: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        removeChat: PropTypes.func.isRequired,
        isLoadingChats: PropTypes.bool.isRequired,
        readUnread: PropTypes.func.isRequired,
        makeActive: PropTypes.func.isRequired,
        makeNotActive: PropTypes.func.isRequired,
        firstDataLoadChats: PropTypes.bool.isRequired
    };

    componentDidMount() {
        const {chats, loadChats, firstDataLoadChats} = this.props;
        if (Object.keys(chats).length == 0 && firstDataLoadChats == false) {
            loadChats();
        }
    }

    childrenCollection = (arr, thing) => {
        if (thing.children.length) {
            for (let i = 0; i < thing.children.length; i++) {
                arr.push(thing.children[i]);
                this.childrenCollection(arr, thing.children[i]);
            }
            return arr;
        }
    };

    setLocation = (e, link, index) => {
        const {chats, push, readUnread, makeActive, makeNotActive} = this.props;
        let button = document.getElementsByClassName('delete-chat')[index],
            arrChildren = [button];
        this.childrenCollection(arrChildren, button);
        if (arrChildren.indexOf(e.target) == -1) {
            Object.keys(chats).map(chatId => {
                if (chats[chatId].active == true) makeNotActive(chatId);
            });
            push(link);
            readUnread(link.slice(6), 'SET_LOCATION');
            makeActive(link.slice(6));
        }
    };

    setLocationAfterRemove = (chat) => {
        const {chats, push, removeChat, makeActive} = this.props;
        removeChat(chat);
        if (Object.keys(chats).length) {
            if (chat.active == true) {
                push(Object.values(chats)[0].link);
                makeActive(Object.keys(chats)[0]);
            }
        } else {
            push('/');
        }
    };

    render() {
        if (this.props.isLoadingChats) {
            return (
                <List className="chatlist" disablePadding={true}>
                    <ListItem className="chatlist-item" key="no-chats">
                        <CircularProgress/>
                        <ListItemText primary="Загрузка чатов..."/>
                    </ListItem>
                </List>
            )
        }
        const {chats, messages} = this.props;
        if (Object.keys(chats).length == 0) {
            return (
                <List className="chatlist" disablePadding={true}>
                    <ListItem className="chatlist-item" key="no-chats">
                        <ListItemText primary="Добавьте новый чат..."/>
                    </ListItem>
                </List>
            );
        }
        const lastMessageId = Object.keys(messages)[Object.keys(messages).length - 1];
        const genItems = (Object.values(chats).map((chat, index) => {
            let blinking = false;
            chat.messageList.map(messageId => {
                if (messageId == lastMessageId && messages[lastMessageId].author == 'robot') blinking = true;
            });
            let classes = classNames('chatlist-item', {
                'chosen': chat.active,
                'just-arrived': blinking,
                'unread': chat.unread
            });
            return (
                <ListItem className={classes} key={index} onClick={(e) => this.setLocation(e, chat.link, index)}>
                    <ListItemAvatar>
                        <Avatar>
                            <ChatIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={chat.title} secondary={chat.messageList.length}/>
                    <IconButton className="delete-chat" aria-label="delete"
                                onClick={() => this.setLocationAfterRemove(chat)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </ListItem>
            )
        }));
        return (
            <List className="chatlist" disablePadding={true}>
                {genItems}
            </List>
        );
    }
}

const mapStateToProps = ({chatReducer}) => ({
    chats: chatReducer.chats,
    messages: chatReducer.messages,
    isLoadingChats: chatReducer.isLoadingChats,
    firstDataLoadChats: chatReducer.firstDataLoadChats
});
const mapDispatchToProps = dispatch => bindActionCreators({
    push,
    removeChat,
    loadChats,
    readUnread,
    makeActive,
    makeNotActive
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);