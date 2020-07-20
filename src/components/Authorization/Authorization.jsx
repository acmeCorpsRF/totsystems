import React, {Component} from 'react';
import './Authorization.scss';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {authorization, registration} from "../../actions/authorizationActions";

class Authorization extends Component {

    static propTypes = {
        authorization: PropTypes.func.isRequired,
        registration: PropTypes.func.isRequired
    };

    state = {
        loginUser: '',
        passwordUser: '',
        errorLoginUser: false,
        errorPasswordUser: false,
        toggleAuthReg: false,
        regLoginUser: '',
        regPasswordUser: '',
        regNameUser: '',
        regSocialActivityUser: ''
    };

    changeLoginUserText = (e) => {
        this.setState({
            loginUser: e.target.value
        });
    };

    changePasswordUserText = (e) => {
        this.setState({
            passwordUser: e.target.value
        });
    };

    sendAuthorization(login, password) {
        fetch('/api/profile.json')
            .then(response => response.json())
            .then(response => {
                if (response.login == login && response.password == password) {
                    this.props.authorization(login, password);
                } else {
                    this.setState({
                        errorLoginUser: true,
                        errorPasswordUser: true
                    });
                }
            });
    }

    toggleAuthReg = (e) => {
        e.preventDefault();
        this.setState({
            toggleAuthReg: !this.state.toggleAuthReg
        });
    };

    changeRegLoginUserText = (e) => {
        this.setState({
            regLoginUser: e.target.value
        });
    };

    changeRegPasswordUserText = (e) => {
        this.setState({
            regPasswordUser: e.target.value
        });
    };

    changeRegNameUserText = (e) => {
        this.setState({
            regNameUser: e.target.value
        });
    };

    changeRegSocialActivityUserText = (e) => {
        this.setState({
            regSocialActivityUser: e.target.value
        });
    };


    sendRegistration(login, password, name, activity) {
        this.props.registration(login, password, name, activity);
    }

    render() {
        if (!this.state.toggleAuthReg) {
            return (
                <div className="authorization">
                    <h1 className="authorization__title">Авторизация
                        <a className="authorization__title-link" href=""
                           onClick={(e) => this.toggleAuthReg(e)}>Регистрация</a>
                    </h1>
                    <form action="">
                        <TextField
                            error={this.state.errorLoginUser}
                            className="entry-field"
                            rowsMax={1}
                            label="Логин"
                            variant="outlined"
                            multiline
                            onChange={this.changeLoginUserText}
                            value={this.state.loginUser}
                            placeholder="nikolai"/>
                        <TextField
                            error={this.state.errorPasswordUser}
                            className="entry-field"
                            rowsMax={1}
                            label="Пароль"
                            variant="outlined"
                            multiline
                            onChange={this.changePasswordUserText}
                            value={this.state.passwordUser}
                            placeholder="12345"/>
                        <Button
                            className="authorization__send-btn"
                            variant="contained"
                            color="secondary"
                            onClick={() => this.sendAuthorization(this.state.loginUser, this.state.passwordUser)}
                        >Отправить</Button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="registration">
                    <h1 className="registration__title">Регистрация
                        <a className="registration__title-link" href=""
                           onClick={(e) => this.toggleAuthReg(e)}>Авторизация</a>
                    </h1>
                    <form action="">
                        <TextField
                            className="entry-field"
                            rowsMax={1}
                            label="Логин"
                            variant="outlined"
                            multiline
                            onChange={this.changeRegLoginUserText}
                            value={this.state.regLoginUser}/>
                        <TextField
                            className="entry-field"
                            rowsMax={1}
                            label="Пароль"
                            variant="outlined"
                            multiline
                            onChange={this.changeRegPasswordUserText}
                            value={this.state.regPasswordUser}/>
                        <TextField
                            className="entry-field"
                            rowsMax={1}
                            label="Имя"
                            variant="outlined"
                            multiline
                            onChange={this.changeRegNameUserText}
                            value={this.state.regNameUser}/>
                        <TextField
                            className="entry-field"
                            rowsMax={1}
                            label="Социальная активность"
                            variant="outlined"
                            multiline
                            onChange={this.changeRegSocialActivityUserText}
                            value={this.state.regSocialActivityUser}/>
                        <Button
                            className="registration__send-btn"
                            variant="contained"
                            color="secondary"
                            onClick={() => this.sendRegistration(this.state.regLoginUser, this.state.regPasswordUser, this.state.regNameUser, this.state.regSocialActivityUser)}
                        >Регистрация</Button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({authorization, registration}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);