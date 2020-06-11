import React, {Component} from 'react';
import Header from '../regions/header/Header';
import Aside from '../regions/aside/Aside';
import MessageField from '../containers/MessageField/MessageField';
import PropTypes from "prop-types";

export default class Layout extends Component {

    static propTypes = {
        chatId: PropTypes.number
    };

    static defaultProps = {
        chatId: 1,
    };

    render() {
        const incomingParams = Number(this.props.match.params.chatId);
        return (
            <div className="wrapper">
                <Header/>
                <Aside url={this.props.match.url}/>
                <MessageField chatId={incomingParams ? incomingParams : this.props.chatId}/>
            </div>
        )
    }
}