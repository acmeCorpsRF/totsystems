import React, {Component} from 'react';
import './MessageField.scss';
import Message from '../../components/Message/Message';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    updateDataSendMessage,
    loadMessages,
    updateDataEditMessage,
    changeInputText
} from "../../actions/messageActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

class MessageField extends Component {

    static propTypes = {
        chatId: PropTypes.number.isRequired,
        messages: PropTypes.object.isRequired,
        chats: PropTypes.object.isRequired,
        updateDataSendMessage: PropTypes.func.isRequired,
        isLoadingMessages: PropTypes.bool.isRequired,
        firstDataLoadMessages: PropTypes.bool.isRequired,
        hiddenEditButton: PropTypes.bool.isRequired,
        updateDataEditMessage: PropTypes.func.isRequired,
        textEditMessage: PropTypes.object.isRequired,
        inputText: PropTypes.string.isRequired,
        changeInputText: PropTypes.func.isRequired
    };

    state = {
        disableSendBtn: true
    };

    componentDidMount() {
        const {messages, loadMessages, firstDataLoadMessages} = this.props;
        if (Object.keys(messages).length == 0 && firstDataLoadMessages == false) {
            loadMessages();
        }
    }

    sendMessage = (e, text) => {
        e.preventDefault();
        const {chatId, user, updateDataSendMessage} = this.props;
        updateDataSendMessage(user, text, chatId);
        this.setState({
            disableSendBtn: true
        });
    };

    sendKeyboardButtons = (e, text) => {
        if (e.shiftKey && e.keyCode === 13) {
            this.sendMessage(e, text);
        }
    };

    handlerChangeInputText = (e) => {
        const {hiddenEditButton, changeInputText} = this.props;
        changeInputText(e.target.value);
        if (e.target.value.length > 0 && hiddenEditButton) {
            this.setState({
                disableSendBtn: false
            });
        } else {
            this.setState({
                disableSendBtn: true
            });
        }
    };

    confirmEditMessage = (e, text, chatId, messageId, author) => {
        e.preventDefault();
        this.props.updateDataEditMessage(chatId, messageId, author, text);
        this.setState({
            disableSendBtn: true
        });
    };

    render() {
        const {chatId, chats, messages, hiddenEditButton, textEditMessage, isLoadingMessages, inputText} = this.props;
        const ColorButton = withStyles((theme) => ({
            root: {
                backgroundColor: '#ffffff',
                '&:hover': {
                    backgroundColor: '#3f51b5',
                    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)'
                }
            }
        }))(Button);
        let classes = classNames('edit-message-btn', {'hidden-btn': hiddenEditButton});
        let messageElements;

        if (isLoadingMessages) {
            return (
                <main className="main">
                    <div className="output-field">
                        <CircularProgress/>
                        <div className="loading-text">Загрузка сообщений...</div>
                    </div>
                </main>
            )
        }
        if (Object.keys(chats).length == 0) {
            return (
                <main className="main">
                    <div className="output-field">
                        <ul className="messages-list">
                            <Message key="no-messages" text="Сообщений нет..." author="robot"/>
                        </ul>
                    </div>
                </main>
            )
        }
        if (chats[chatId].messageList.length !== 0 && Object.keys(messages).length !== 0) {
            messageElements = chats[chatId].messageList.map((messageId, index) => (
                <Message key={index}
                         text={messages[messageId].text}
                         author={messages[messageId].author}
                         chatId={chatId}
                         messageId={messageId}
                         focused={messages[messageId].focused}
                />
            ));
        } else {
            messageElements = <Message key="no-messages" text="Сообщений нет..." author="robot"/>;
        }
        return (
            <main className="main">
                <div className="output-field">
                    <ul className="messages-list">
                        {messageElements}
                    </ul>
                </div>
                <form action="">
                    <TextField
                        className="entry-field"
                        id="entry-field"
                        rowsMax={2}
                        label="Сообщение"
                        variant="outlined"
                        multiline
                        onChange={this.handlerChangeInputText}
                        onKeyDown={e => this.sendKeyboardButtons(e, inputText)}
                        value={inputText}/>
                    <Button
                        className="send-message-btn"
                        variant="contained"
                        color="secondary"
                        onClick={e => this.sendMessage(e, inputText)}
                        disabled={this.state.disableSendBtn}
                    >&gt;</Button>
                    <ColorButton
                        className={classes}
                        color="primary"
                        onClick={e => this.confirmEditMessage(e, inputText, textEditMessage.chatId, textEditMessage.messageId, textEditMessage.author)}
                    ><CheckCircleOutlineIcon fontSize="large"/></ColorButton>
                </form>
            </main>
        )
    }
}

const mapStateToProps = ({chatReducer, profileReducer}) => ({
    user: profileReducer.user,
    chats: chatReducer.chats,
    messages: chatReducer.messages,
    isLoadingMessages: chatReducer.isLoadingMessages,
    firstDataLoadMessages: chatReducer.firstDataLoadMessages,
    hiddenEditButton: chatReducer.hiddenEditButton,
    textEditMessage: chatReducer.textEditMessage,
    inputText: chatReducer.inputText
});
const mapDispatchToProps = dispatch => bindActionCreators({
    updateDataSendMessage,
    loadMessages,
    updateDataEditMessage,
    changeInputText
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageField);