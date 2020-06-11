import React, {Component} from 'react';
import './Message.scss';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {removeMessage, editMessage} from '../../actions/messageActions';
import classNames from 'classnames';

class Message extends Component {

    static propTypes = {
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        removeMessage: PropTypes.func.isRequired,
        editMessage: PropTypes.func.isRequired,
        hiddenEditButton: PropTypes.bool.isRequired
    };

    render() {
        const {author, text, editMessage, removeMessage, chatId, messageId, focused} = this.props;
        let classes = classNames('message user', {'focused': focused});

        if (author == 'robot') {
            return <li className="message robot">{text}
                <div className="message-actions">
                    <IconButton
                        className="delete-message"
                        onClick={() => removeMessage(chatId, messageId)}
                        title="Удалить">
                        <DeleteForeverIcon fontSize="small"/>
                    </IconButton>
                </div>
            </li>
        } else {
            return <li className={classes}>
                <b>{author + ': ' + text}</b>
                <div className="message-actions">
                    <IconButton
                        className="edit-message"
                        onClick={() => editMessage(chatId, messageId, author, text)}
                        title="Редактировать">
                        <EditIcon fontSize="small"/>
                    </IconButton>
                    <IconButton
                        className="delete-message"
                        onClick={() => removeMessage(chatId, messageId)}
                        title="Удалить">
                        <DeleteForeverIcon fontSize="small"/>
                    </IconButton>
                </div>
            </li>
        }
    }
}

const mapStateToProps = ({chatReducer}) => ({hiddenEditButton: chatReducer.hiddenEditButton});
const mapDispatchToProps = dispatch => bindActionCreators({
    removeMessage,
    editMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Message);