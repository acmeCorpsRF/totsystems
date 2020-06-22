import React, {Component} from 'react';
import Header from '../regions/header/Header';
import Aside from '../regions/aside/Aside';
import MessageField from '../containers/MessageField/MessageField';
import PropTypes from "prop-types";
import {loadProfile} from "../actions/profileActions";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

export class Layout extends Component {

    static propTypes = {
        chatId: PropTypes.number,
        authorizedUser: PropTypes.bool.isRequired,
        registeredUser: PropTypes.bool.isRequired
    };

    static defaultProps = {
        chatId: 1,
    };


    componentDidMount() {
        const {authorizedUser, registeredUser, loadProfile} = this.props;
        if (authorizedUser !== false && registeredUser == false) {
            loadProfile();
        }
    }

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


const mapStateToProps = ({authorizationReducer}) => ({
    authorizedUser: authorizationReducer.authorizedUser,
    registeredUser: authorizationReducer.registeredUser
});
const mapDispatchToProps = dispatch => bindActionCreators({loadProfile}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);