import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './Layout';
import NotFound from '../components/404/';
import Profile from '../containers/Profile/Profile';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {loadProfile} from "../actions/profileActions";

class Router extends Component {

    static propTypes = {
        chats: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.loadProfile();
    }

    render() {
        const {chats} = this.props;
        if (Object.keys(chats).length == 0) {
            return (
                <Switch>
                    <Route exact path='/' component={Layout}/>
                    <Route exact path='/profile/' component={Profile}/>
                    <Route component={NotFound}/>
                </Switch>
            );
        }
        return (
            <Switch>
                <Route exact path='/' component={Layout}/>
                <Route exact path='/chat/:chatId/' component={Layout}/>
                <Route exact path='/profile/' component={Profile}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}

const mapStateToProps = ({chatReducer}) => ({
    chats: chatReducer.chats
});
const mapDispatchToProps = dispatch => bindActionCreators({loadProfile}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Router);

